const form = document.querySelector("form"),
  fileInput = document.querySelector(".file-input"),
  progressArea = document.querySelector(".progress-area"),
  uploadedArea = document.querySelector(".uploaded-area");

form.addEventListener("click", () => {
  fileInput.click();
});

var data = new FormData();

fileInput.onchange = ({ target }) => {
  let files = target.files.length;

  for (let i = 0; i < files; i++) {
    if (target.files[i]) {
      let fileName = target.files[i]["name"];
      if (fileName.length >= 12) {
        let splitName = fileName.split(".");
        fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
      }
    }

    let ajax_request = new XMLHttpRequest();
    ajax_request.open("POST", "php/upload.php");

    if (ajax_request.upload) {
      ajax_request.upload.addEventListener("progress", ({ loaded, total }) => {
        let fileLoaded = Math.floor((loaded / total) * 100);
        let fileTotal = Math.floor(total / 1000);
        let fileSize;
        fileTotal < 1024
          ? (fileSize = fileTotal + " KB")
          : (fileSize = (loaded / (1024 * 1024)).toFixed(2) + " MB");

        let progressHTML = `
          <li class="row">
              <i class="fas fa-file-alt"></i>
              <div class="content">
                <div class="details">
                  <span class="name">${target.files[i]["name"]} • Uploading</span>
                  <span class="percent">${fileLoaded}%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress" style="width: ${fileLoaded}%"></div>
                </div>
              </div>
          </li>
        `;
        uploadedArea.classList.add("onprogress");
        progressArea.innerHTML = progressHTML;

        if (loaded === total) {
          progressArea.innerHTML = "";
          let uploadedHTML = `
            <li class="row">
                <div class="content upload">
                  <i class="fas fa-file-alt"></i>
                  <div class="details">
                    <span class="name">${target.files[i]["name"]} • Uploaded</span>
                    <span class="size">${fileSize}</span>
                  </div>
                </div>
                <i class="fas fa-check"></i>
            </li>
          `;
          uploadedArea.classList.remove("onprogress");
          uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
        }
      });
    }

    data = new FormData();
    data.append("files", target.files[i]);
    ajax_request.send(data);
  }
};
