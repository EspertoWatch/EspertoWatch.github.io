<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load composer's autoloader
require 'vendor/autoload.php';

$mail = new PHPMailer;                              // Passing `true` enables exceptions
try {
    //Server settings
    //$mail->isSMTP();                            // Set mailer to use SMTP
	$mail->Host = 'smtp.gmail.com';             // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                     // Enable SMTP authentication
	$mail->Username = 'austin.atmaja@gmail.com';          // SMTP username
	$mail->Password = 'twilight princess1998'; // SMTP password
	$mail->SMTPSecure = 'tls';                  // Enable TLS encryption, `ssl` also accepted
	$mail->Port = 587;  

    $mail->setFrom('austin.atmaja@gmail.com');
	$mail->addAddress('austin.atmaja@gmail.com');   // Add a recipient

	//$name = $_POST['name'];
	//$text = $_POST['text'];

	$mail->Subject = 'Contact request';
	$mail->Body    = 'hello';

	$mail->smtpConnect(
	    array(
	        "ssl" => array(
	            "verify_peer" => false,
	            "verify_peer_name" => false,
	            "allow_self_signed" => true
	        )
	    )
	);
   

    $mail->send();
    echo 'Message has been sent';
	} catch (Exception $e) {
	    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
	}

?>