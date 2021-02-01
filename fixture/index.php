<?php

$waittime = 65;
logAndPrint("Waiting for {$waittime} seconds");
for ($i = 0; $i < $waittime; $i++) {
    logAndPrint("{$i}");
    sleep(1);
}

echo "Done.\n";

function logAndPrint(string $msg): void {
    echo("{$msg}<br>\n");
    error_log($msg);
}
