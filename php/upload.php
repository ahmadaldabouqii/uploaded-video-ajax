<?php

if (isset($_FILES['files'])) {
    for ($count = 0; $count < count($_FILES['files']); $count++) {
        $extension = pathinfo($_FILES['files']['name'][$count], PATHINFO_EXTENSION);
        $new_name  = uniqid() . '.' . $extension;
        move_uploaded_file($_FILES['files']['tmp_name'][$count], 'files/' . $new_name);
    }
    echo 'success';
}