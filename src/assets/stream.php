<php?
$filename = "http://stream.codigosur.org:8000/kasandrxs.mp3";
header("Content-Type: audio/mpeg");
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,$filename);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 500);
curl_setopt($ch, CURLOPT_WRITEFUNCTION, function($curl, $data) {
    echo $data;
    return strlen($data);
});
curl_exec($ch);
curl_close($ch);