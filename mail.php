<?php
//get data from form  
$name = $_POST['name'];
$email= $_POST['email'];
$subject = $_POST['subject'];
$message= $_POST['message'];



$to = "office@intermove.rs";

$txt ="Name = ". $name . "\r\n Email = " . $email . "\r\n Subject =" . $subject . "\r\n Message =" . $message;
$headers = "From: website@intermove.rs" . "\r\n" .
"CC: office@intermove.rs";
if($email!=NULL){
    mail($to,$subject,$txt,$headers);
}

?>