<?php
require_once "jsonld.php";

$person = file_get_contents('../data/person.jsonld');
$result = array();
for($i=0;$i<1000;$i++) {
   $json_person = json_decode($person);
   $jsonld_person = jsonld_compact($json_person, "http://schema.org/");
   $result[] = $jsonld_person;
}

?>
