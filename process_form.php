<?php

// Get the form data
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// Send the email to the church
$to = 'nelvinekavaya@gmail.com';
$subject = 'Church Website Form Submission';
$body = "
Name: $name
Email: $email
Message: $message
";
mail($to, $subject, $body);

// Return a success message
$successMessage = 'Your message has been sent successfully.';

// Display the success message
?>

<html>
<head>
<title>Form Submission Success</title>
</head>
<body>
<h1>Form Submission Success</h1>
<a href="index.html">Go back to main menu</a>
<p><?php echo $successMessage; ?></p>
</body>
</html>