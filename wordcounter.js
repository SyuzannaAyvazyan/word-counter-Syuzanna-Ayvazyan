document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("inputField");
    const outputField = document.getElementById("outputField");
    const downloadButton = document.getElementById("downloadButton");
    const changeColorButton = document.getElementById("changeColorButton");

    function updateCount() {
        const text = inputField.value;
        const letterCount = text.replace(/\s/g, "").length;
        const totalLength = text.length;
        const wordCount = text.trim().length > 0 ? text.trim().split(/\s+/).length : 0;
        const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;

        outputField.innerHTML = `
            <h3><strong>Total Length:</strong> ${totalLength} characters (including spaces)</h3>
            <h3><strong>Letters:</strong> ${letterCount}</h3>
            <h3><strong>Words:</strong> ${wordCount}</h3>
            <h3><strong>Sentences:</strong> ${sentenceCount}</h3>
        `;
    }
      
      changeColorButton.addEventListener("click", function(){
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        document.body.style.backgroundColor = "#" + randomColor;
        color.innerHTML = "#" + randomColor;
      });
      

    inputField.addEventListener("input", updateCount);

    downloadButton.addEventListener("click", function () {
        const text = inputField.value.trim();

        if (text === "") {
            alert("Please enter some text before downloading the PDF.");
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const letterCount = text.replace(/\s/g, "").length;
        const totalLength = text.length;
        const wordCount = text.split(/\s+/).length;
        const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);
        doc.text("User Input:", 10, 10);
        doc.setFontSize(12);
        doc.text(text, 10, 20, { maxWidth: 180 });

        doc.setFontSize(14);
        doc.text("Text Statistics:", 10, doc.internal.pageSize.height - 60);
        doc.setFontSize(12);
        doc.text(`- Total Length: ${totalLength} characters (including spaces)`, 10, doc.internal.pageSize.height - 50);
        doc.text(`- Letters: ${letterCount}`, 10, doc.internal.pageSize.height - 40);
        doc.text(`- Words: ${wordCount}`, 10, doc.internal.pageSize.height - 30);
        doc.text(`- Sentences: ${sentenceCount}`, 10, doc.internal.pageSize.height - 20);

        doc.save("text_statistics.pdf");
    });
});
