<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = 'sabasaba262009@gmail.com';
    $subject = 'New Newsletter Subscription';
    $headers = "From: no-reply@stylishvibes.com\r\n";
    $headers .= "Reply-To: no-reply@stylishvibes.com\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $message = "A new subscription has been received:\n\nEmail: $email";

        if (mail($to, $subject, $message, $headers)) {
            http_response_code(200);
        } else {
            http_response_code(500);
        }
    } else {
        http_response_code(400);
    }
} else {
    http_response_code(400);
}
?>