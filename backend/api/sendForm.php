<?php
header("Access-Control-Allow-Origin: *");

function generate_reference()
{
    $message_name = "";
    $code = "az12345678MWXC9ertyuiUIOPQSDFGHJopqsdfgh123456789jklmwxcvbn123456789AZERTYKLVBN";

    $index = 1;
    while ($index <= 20) {
        $message_name .= $code[rand(0, 78)];
        $index++;
    }
    return $message_name;
}

$result = [
    "request_date" => date("d m Y H:i:s")
];

if (isset($_POST)) {
    echo "okokoko <br>";
    var_dump($_POST);
    // echo $_POST["dataname"];
    // echo $_POST["firstname"];
    // echo $_FILES["firstname"];
    // var_dump($_SERVER);
}

if (isset($_POST) && !empty($_POST)) {
    //donnee envoyees
    //traitement des donnees

    $firstname = strip_tags(trim($_POST["firstname"]));
    $lastname = strip_tags(trim($_POST["lastname"]));
    $email = strip_tags(trim($_POST["email"]));
    $subjet = strip_tags(trim($_POST["subjet"]));
    $message = strip_tags(trim($_POST["message"]));

    $formData = [
        "firstname" => $firstname,
        "lastname" => $lastname,
        "email" => $email,
        "subjet" => $subjet,
        "message" => $message,
        "date" => date("d m Y H:i:s")
    ];

    $message_name = generate_reference();
    $message_to_save[$message_name] = $formData;
    $message_to_save_serialise = serialize($message_to_save[$message_name]);
    // $file = "/formMessage/formMessage.txt";
    $file = "../formMessage/formMessage.txt";
    // $retour_ligne = "\n";

    file_put_contents($file, $message_to_save_serialise, FILE_APPEND);

    $result["error_server_message"] = "message envoye avec succes";
    $result["error_code"] = 200;
    $result["isSucces"] = true;
} else {
    //non envoyees
    $result["error_server_message"] = "message non envoye";
    $result["error_code"] = 500;
    $result["isSucces"] = false;
}

$result["request_date"] = date("d m Y H:i:s");

$result_json = json_encode($result);
echo $result_json;
