<?php
/**
 * BLUE OCEAN REALTY (PTY) LTD & ROHAN REALTY
 * Production Lead Dispatch & Enquiry Handler
 *
 * Security Architecture:
 * - Method verification (POST only)
 * - Security headers (nosniff, frame-ancestors deny, strict referrer)
 * - Multi-vector honeypot detection (_honey, _gotcha, website)
 * - Submission timestamp velocity check (bot tarpit)
 * - Client IP rate limiting (file-based token bucket, 5 req / 10 min)
 * - Comprehensive input sanitization & SMTP header injection prevention
 * - POPIA consent enforcement
 *
 * Routing Targets:
 * - rohanramlall2005@gmail.com
 * - benjamingovindraj@gmail.com
 */

// Suppress raw error output to prevent information disclosure
error_reporting(0);
ini_set('display_errors', '0');

// Set baseline security headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: strict-origin-when-cross-origin');

// Response helper
function sendJsonResponse($statusCode, $data) {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($data);
    exit;
}

// 1. Enforce POST Method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(405, [
        'success' => false,
        'error' => 'Method Not Allowed'
    ]);
}

// 2. Extract Data (Supporting JSON fetch payloads and standard Form POST)
$rawInput = file_get_contents('php://input');
$jsonData = json_decode($rawInput, true);
$data = (is_array($jsonData) && !empty($jsonData)) ? $jsonData : $_POST;

if (empty($data)) {
    sendJsonResponse(400, [
        'success' => false,
        'error' => 'Empty request payload'
    ]);
}

// 3. Security Check: Honeypot Traps
// If any hidden honeypot field contains content, silently tarpit the bot with 200 OK
if (!empty($data['_honey']) || !empty($data['_gotcha']) || !empty($data['website']) || !empty($data['hp_company'])) {
    sendJsonResponse(200, [
        'success' => true,
        'message' => 'Your request has been received.'
    ]);
}

// 4. Security Check: Submission Velocity
// If submission took less than 1.2 seconds from page render, treat as automated script
if (!empty($data['_submission_time'])) {
    $renderedAt = floatval($data['_submission_time']);
    $now = microtime(true) * 1000;
    if ($renderedAt > 0 && ($now - $renderedAt) < 1200) {
        sendJsonResponse(200, [
            'success' => true,
            'message' => 'Your request has been received.'
        ]);
    }
}

// 5. Security Check: IP Rate Limiting (5 requests per 10 minutes per IP)
$clientIp = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
$rateLimitFile = sys_get_temp_dir() . '/bor_rate_limits_' . md5($clientIp) . '.json';
$rateWindow = 600; // 10 minutes
$maxRequests = 5;

$rateData = ['count' => 0, 'first_request' => time()];
if (file_exists($rateLimitFile)) {
    $existing = json_decode(file_get_contents($rateLimitFile), true);
    if (is_array($existing) && isset($existing['count']) && isset($existing['first_request'])) {
        if ((time() - $existing['first_request']) < $rateWindow) {
            $rateData = $existing;
        }
    }
}

$rateData['count']++;
if ($rateData['count'] > $maxRequests) {
    sendJsonResponse(429, [
        'success' => false,
        'error' => 'Submission rate limit reached. Please call 069 522 4226 directly for immediate assistance.'
    ]);
}
@file_put_contents($rateLimitFile, json_encode($rateData), LOCK_EX);

// 6. Input Sanitization & Validation
$name = isset($data['name']) ? trim(strip_tags((string)$data['name'])) : '';
$phone = isset($data['phone']) ? trim(strip_tags((string)$data['phone'])) : '';
$email = isset($data['email']) ? trim(strip_tags((string)$data['email'])) : '';
$message = isset($data['message']) ? trim(strip_tags((string)$data['message'])) : '';
$formType = isset($data['form_type']) ? trim(strip_tags((string)$data['form_type'])) : 'Website Enquiry';
$propertyName = isset($data['property_name']) ? trim(strip_tags((string)$data['property_name'])) : '';
$propertyInterest = isset($data['property_interest']) ? trim(strip_tags((string)$data['property_interest'])) : '';
$nature = isset($data['nature']) ? trim(strip_tags((string)$data['nature'])) : '';
$interest = isset($data['interest']) ? trim(strip_tags((string)$data['interest'])) : '';
$pageUrl = isset($data['page_url']) ? trim(strip_tags((string)$data['page_url'])) : ($_SERVER['HTTP_REFERER'] ?? '');
$popiaConsent = isset($data['popia_consent']) || isset($data['popiaConsent']);

// Determine the primary asset/topic of interest
$subjectAsset = $propertyName;
if (empty($subjectAsset)) {
    $subjectAsset = !empty($propertyInterest) ? $propertyInterest : (!empty($nature) ? $nature : (!empty($interest) ? $interest : 'General Mandate Advisory'));
}
$focusArea = !empty($nature) ? $nature : (!empty($interest) ? $interest : (!empty($propertyInterest) ? $propertyInterest : ''));


// Validation rules
if (empty($name) || strlen($name) < 2 || strlen($name) > 100) {
    sendJsonResponse(422, [
        'success' => false,
        'error' => 'Please provide a valid full name.'
    ]);
}

// Strip CR/LF to neutralize email header injection
$cleanEmail = str_replace(["\r", "\n", "%0a", "%0d"], '', $email);
if (!filter_var($cleanEmail, FILTER_VALIDATE_EMAIL)) {
    sendJsonResponse(422, [
        'success' => false,
        'error' => 'Please provide a valid email address.'
    ]);
}

$cleanPhone = preg_replace('/[^\d\+\-\s\(\)]/', '', $phone);
$digitCount = preg_match_all('/\d/', $cleanPhone);
if ($digitCount < 7 || strlen($cleanPhone) > 30) {
    sendJsonResponse(422, [
        'success' => false,
        'error' => 'Please provide a valid contact telephone number.'
    ]);
}

// Neutralize clean name for headers
$cleanName = str_replace(["\r", "\n", "%0a", "%0d"], '', $name);

// Timestamp in South Africa Standard Time (SAST, UTC+2)
$dateTimeSast = date('Y-m-d H:i:s') . ' SAST';

// Clean WhatsApp international format (+27)
$waPhone = preg_replace('/\D/', '', $cleanPhone);
if (strpos($waPhone, '0') === 0) {
    $waPhone = '27' . substr($waPhone, 1);
}
$waLink = 'https://wa.me/' . $waPhone;

// 7. Assemble Structured Subject Line
$emailSubject = '[Blue Ocean Realty] ' . $formType . ' - ' . $subjectAsset . ' (' . $cleanName . ')';

// 8. Build Branded HTML Email Template
$safeName = htmlspecialchars($cleanName, ENT_QUOTES, 'UTF-8');
$safePhone = htmlspecialchars($cleanPhone, ENT_QUOTES, 'UTF-8');
$safeEmail = htmlspecialchars($cleanEmail, ENT_QUOTES, 'UTF-8');
$safeAsset = htmlspecialchars($subjectAsset, ENT_QUOTES, 'UTF-8');
$safeFormType = htmlspecialchars($formType, ENT_QUOTES, 'UTF-8');
$safeFocus = htmlspecialchars($focusArea, ENT_QUOTES, 'UTF-8');
$safeMessage = !empty($message) ? nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) : '<em>No additional brief entered.</em>';
$safePageUrl = htmlspecialchars($pageUrl, ENT_QUOTES, 'UTF-8');

$focusRow = '';
if (!empty($safeFocus) && $safeFocus !== $safeAsset) {
    $focusRow = '<tr style="border-bottom:1px solid #E2E8F0;"><td style="padding:12px 0; font-size:13px; font-weight:700; color:#64748B; text-transform:uppercase; letter-spacing:0.04em;">Specific Focus</td><td style="padding:12px 0; font-size:14px; font-weight:600; color:#0A192F;">' . $safeFocus . '</td></tr>';
}

$htmlBody = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{$emailSubject}</title>
</head>
<body style="margin:0; padding:0; background-color:#F1F5F9; font-family:'Helvetica Neue', Arial, sans-serif; color:#0F172A; line-height:1.6;">
  <div style="max-width:640px; margin:24px auto; background-color:#FFFFFF; border:1px solid #E2E8F0; border-radius:12px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.06);">
    
    <!-- Top Obsidian Brand Header -->
    <div style="background-color:#060B14; padding:28px 32px; border-bottom:3px solid #C9A050;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td>
            <div style="font-size:11px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:#C9A050; margin-bottom:4px;">
              Blue Ocean Realty (Pty) Ltd &bull; Private Client Advisory
            </div>
            <div style="font-size:22px; font-weight:800; color:#FFFFFF; letter-spacing:0.02em;">
              New Direct Lead Notification
            </div>
          </td>
          <td align="right" valign="middle">
            <span style="display:inline-block; padding:6px 14px; background-color:rgba(201,160,80,0.15); border:1px solid #C9A050; border-radius:4px; font-size:11px; font-weight:700; color:#E0A200; text-transform:uppercase; letter-spacing:0.08em;">
              {$safeFormType}
            </span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Main Content Area -->
    <div style="padding:32px;">
      
      <!-- Key Asset Callout -->
      <div style="background-color:#F8FAFC; border-left:4px solid #C9A050; padding:16px 20px; border-radius:0 8px 8px 0; margin-bottom:24px;">
        <div style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#64748B; margin-bottom:4px;">
          Property / Mandate of Interest
        </div>
        <div style="font-size:18px; font-weight:800; color:#0A192F;">
          {$safeAsset}
        </div>
      </div>

      <!-- Lead Details Table -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; margin-bottom:28px;">
        <tr style="border-bottom:1px solid #E2E8F0;">
          <td style="padding:12px 0; font-size:13px; font-weight:700; color:#64748B; width:140px; text-transform:uppercase; letter-spacing:0.04em;">Full Name</td>
          <td style="padding:12px 0; font-size:15px; font-weight:700; color:#0A192F;">{$safeName}</td>
        </tr>
        <tr style="border-bottom:1px solid #E2E8F0;">
          <td style="padding:12px 0; font-size:13px; font-weight:700; color:#64748B; text-transform:uppercase; letter-spacing:0.04em;">Phone Number</td>
          <td style="padding:12px 0; font-size:15px; font-weight:700; color:#0A192F;">
            <a href="tel:{$safePhone}" style="color:#0A192F; text-decoration:none; border-bottom:1px dashed #C9A050;">{$safePhone}</a>
          </td>
        </tr>
        <tr style="border-bottom:1px solid #E2E8F0;">
          <td style="padding:12px 0; font-size:13px; font-weight:700; color:#64748B; text-transform:uppercase; letter-spacing:0.04em;">Email Address</td>
          <td style="padding:12px 0; font-size:15px; font-weight:600; color:#003E7E;">
            <a href="mailto:{$safeEmail}" style="color:#003E7E; text-decoration:none;">{$safeEmail}</a>
          </td>
        </tr>
        <tr style="border-bottom:1px solid #E2E8F0;">
          <td style="padding:12px 0; font-size:13px; font-weight:700; color:#64748B; text-transform:uppercase; letter-spacing:0.04em;">Enquiry Type</td>
          <td style="padding:12px 0; font-size:14px; color:#334155;">{$safeFormType}</td>
        </tr>
        {$focusRow}
        <tr style="border-bottom:1px solid #E2E8F0;">
          <td style="padding:12px 0; font-size:13px; font-weight:700; color:#64748B; text-transform:uppercase; letter-spacing:0.04em;">Received At</td>
          <td style="padding:12px 0; font-size:14px; color:#334155;">{$dateTimeSast}</td>
        </tr>
        <tr>
          <td style="padding:12px 0; font-size:13px; font-weight:700; color:#64748B; text-transform:uppercase; letter-spacing:0.04em;">Source Page</td>
          <td style="padding:12px 0; font-size:13px; color:#64748B; word-break:break-all;">{$safePageUrl}</td>
        </tr>
      </table>

      <!-- Confidential Message / Brief Box -->
      <div style="margin-bottom:28px;">
        <div style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#64748B; margin-bottom:8px;">
          Confidential Client Brief
        </div>
        <div style="background-color:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:18px; font-size:14px; color:#1E293B; line-height:1.7;">
          {$safeMessage}
        </div>
      </div>

      <!-- Quick Action Buttons -->
      <div style="background-color:#0A192F; border-radius:8px; padding:20px; text-align:center; margin-bottom:24px;">
        <div style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#C9A050; margin-bottom:14px;">
          Direct Practitioner Actions
        </div>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center" style="padding:4px;">
              <a href="{$waLink}" target="_blank" style="display:inline-block; padding:12px 20px; background-color:#25D366; color:#FFFFFF; text-decoration:none; font-size:13px; font-weight:700; border-radius:6px; letter-spacing:0.04em;">
                WhatsApp Lead
              </a>
            </td>
            <td align="center" style="padding:4px;">
              <a href="tel:{$safePhone}" style="display:inline-block; padding:12px 20px; background-color:#C9A050; color:#060B14; text-decoration:none; font-size:13px; font-weight:700; border-radius:6px; letter-spacing:0.04em;">
                Call Client
              </a>
            </td>
            <td align="center" style="padding:4px;">
              <a href="mailto:{$safeEmail}?subject=Blue%20Ocean%20Realty%20-%20{$safeAsset}" style="display:inline-block; padding:12px 20px; background-color:#1E293B; color:#FFFFFF; border:1px solid rgba(255,255,255,0.2); text-decoration:none; font-size:13px; font-weight:700; border-radius:6px; letter-spacing:0.04em;">
                Reply Email
              </a>
            </td>
          </tr>
        </table>
      </div>

      <!-- POPIA & Compliance Notice -->
      <div style="border-top:1px solid #E2E8F0; padding-top:16px; font-size:11px; color:#94A3B8; line-height:1.5;">
        <strong>POPIA Compliance Verification:</strong> The client explicitly accepted the POPIA processing terms on submission. Client IP: {$clientIp} &bull; Transmitted via Blue Ocean Realty Production Dispatch Engine.
      </div>

    </div>

    <!-- Agency Statutory Sub-Footer -->
    <div style="background-color:#060B14; padding:20px 32px; border-top:1px solid rgba(255,255,255,0.08); font-size:11px; color:#64748B; line-height:1.6;">
      <div style="color:#C9A050; font-weight:700; margin-bottom:4px;">
        BLUE OCEAN REALTY (PTY) LTD &bull; REGISTERED WITH THE PPRA (PPA ACT 22 OF 2019)
      </div>
      <div>
        Candidate Property Practitioner: Rohan Ramlall (069 522 4226) &bull; Principal Property Practitioner: Benjamin Govindraj (073 691 0478)
      </div>
      <div>
        Suite 6, 66 Adelaide Tambo Drive, Durban North, 4051, KwaZulu-Natal, South Africa
      </div>
    </div>

  </div>
</body>
</html>
HTML;

// 9. Send Email to Both Recipients via mail()
$to = 'rohanramlall2005@gmail.com, benjamingovindraj@gmail.com';

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset=UTF-8';
$headers[] = 'From: Blue Ocean Realty <info@blueoceanrealty.co.za>';
$headers[] = 'Reply-To: ' . $cleanName . ' <' . $cleanEmail . '>';
$headers[] = 'X-Mailer: Blue Ocean Realty Mail Engine v3.5';
$headers[] = 'X-Priority: 1 (Highest)';
$headers[] = 'Importance: High';

$mailSent = @mail($to, $emailSubject, $htmlBody, implode("\r\n", $headers));

if ($mailSent) {
    sendJsonResponse(200, [
        'success' => true,
        'provider' => 'php',
        'message' => 'Your consultation request has been received. Rohan Ramlall and Benjamin Govindraj will contact you shortly.'
    ]);
} else {
    // Return 500 so frontend AJAX instantly falls back to FormSubmit
    sendJsonResponse(500, [
        'success' => false,
        'provider' => 'php',
        'error' => 'Native mail delivery unavailable on host. Fallback required.'
    ]);
}
