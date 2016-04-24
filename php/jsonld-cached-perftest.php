<?php
require_once "jsonld.php";

$ctx = file_get_contents('../contexts/schema.org.jsonld');
global $mocks;
$mocks = array('http://schema.org/' => $ctx);
function mock_load($url) {
  global $jsonld_default_load_document, $mocks;
  if(isset($mocks[$url])) {
    // return a "RemoteDocument", it has these three properties:
    return (object)array(
      'contextUrl' => null,
      'document' => $mocks[$url],
      'documentUrl' => $url);
  }
  // use default loader
  return call_user_func($jsonld_default_load_document, $url);
}

jsonld_set_document_loader('mock_load');

$person = file_get_contents('../data/person.jsonld');
$result = array();
for($i=0;$i<1000;$i++) {
   $json_person = json_decode($person);
   $jsonld_person = jsonld_compact($json_person, "http://schema.org/");
   $result[] = $jsonld_person;
}

?>
