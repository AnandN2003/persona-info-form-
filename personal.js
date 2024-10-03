function chooseUpload() {
    const choice = confirm("Choose an option: \n\nPress OK to upload a file.\nPress Cancel to take a photo.");
    if (choice) {
        document.getElementById('fileInput').click(); 
    } else {
        // Create a modal window
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';

        // Create a video element to display the camera feed
        const video = document.createElement('video');
        video.style.width = '400px';
        video.style.height = '300px';
        video.style.border = '1px solid black';

        // Create a capture button
        const captureButton = document.createElement('button');
        captureButton.textContent = 'Capture';
        captureButton.style.padding = '15px 30px';
        captureButton.style.fontSize = '20px';
        captureButton.style.backgroundColor = 'rgb(244, 105, 228)';
        captureButton.style.color = 'white';
        captureButton.style.border = 'none';
        captureButton.style.borderRadius = '5px';
        captureButton.style.cursor = ' pointer';

        // Add the video and capture button to the modal window
        modal.appendChild(video);
        modal.appendChild(captureButton);

        // Add the modal window to the page
        document.body.appendChild(modal);

        // Get access to the camera
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
                video.play();
                captureButton.onclick = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                    const photo = canvas.toDataURL();
                    document.body.appendChild(canvas);
                    stream.getTracks().forEach(track => track.stop());
                    modal.remove();
                };
            })
            .catch(error => {
                console.error('Error accessing camera:', error);
                modal.remove();
            });
    }
}

function validateName(inputField) {
    const value = inputField.value;
    const alphabetRegex = /^[A-Za-z\s]*$/;
    if (!alphabetRegex.test(value) && value !== '') {
        alert("Error: Only alphabets are allowed in the name field.");
    }
}

function validateDate(inputField) {
    const value = inputField.value;
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(value) && value !== '') {
        alert("Error: Date must be in the format DD/MM/YYYY.");
    }
}

function validateAddress(inputField) {
    const value = inputField.value;
    if (value.length > 100) {
        alert("Error: Address is too long (maximum 100 characters).");
    }
}

function validateEmail(inputField) {
    const value = inputField.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value) && value !== '') {
        alert("Error: Please enter a valid email address.");
    }
}

function validatePhone(inputField) {
    const value = inputField.value;
    const phoneRegex = /^\d{10}$/; // Adjust based on your phone number format
    if (!phoneRegex.test(value) && value !== '') {
        alert("Error: Phone number must be 10 digits long.");
    }
}