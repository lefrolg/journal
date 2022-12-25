/**
 * Created by Alexander Golovnya on 2019-04-04.
 */
export default function openBlobOtherWindow(blob, filename, ahref) {
  if (typeof window.navigator.msSaveBlob !== "undefined") {
    //   IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const URL = window.URL || window.webkitURL;
    const downloadUrl = URL.createObjectURL(blob);

    if (filename) {
      // safari doesn't support this yet
      if (typeof ahref.download === "undefined") {
        window.location = downloadUrl;
      } else {
        ahref.href = downloadUrl;
        ahref.download = filename;
        ahref.target = "_blank";
        ahref.click();
      }
    } else {
      window.location = downloadUrl;
    }
  }
}
