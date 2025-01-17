function capitalizeFirstLetter(...words) {
    // Iterate through each word in the array
    const capitalizedWords = words.map(word => {
        // Check if the input is a string
        if (typeof word !== 'string') {
            return word;
        }

        // Split the word based on spaces
        const wordParts = word.split(/\s|_/);

        // Capitalize the first letter of each word part
        const capitalizedWord = wordParts.map(part =>
            part.charAt(0).toUpperCase() + part.slice(1)
        );

        // Join the capitalized word parts with a space
        return capitalizedWord.join(' ');
    });

    // Join the capitalized words with a space and return the result
    return capitalizedWords.join(' ');
}

function setLowerCaseForAllWordsLetter(...words) {
    // Iterate through each word in the array
    const lowercaseWords = words.map(word => {
        // Check if the input is a string
        if (typeof word !== 'string') {
            return word;
        }

        // Split the word based on spaces
        const wordParts = word.split(/\s|_/);

        // Capitalize the first letter of each word part
        const lowercaseWord = wordParts.map(part =>
            part.charAt(0).toLowerCase() + part.slice(1)
        );

        // Join the capitalized word parts with a space
        return lowercaseWord.join(' ');
    });

    // Join the capitalized words with a space and return the result
    return lowercaseWords.join(' ');
}

function capitalizeFirstLetterInSentence(sentence) {
    // Check if the input is a non-empty string
    if (typeof sentence !== 'string' || sentence.length === 0) {
        return sentence; // Return unchanged if not a string or empty
    }

    // Capitalize the first letter and concatenate with the rest of the sentence
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

function setLowerCaseForAllWordsInSentence(sentence) {
    // Check if the input is a non-empty string
    if (typeof sentence !== 'string' || sentence.length === 0) {
        return sentence; // Return unchanged if not a string or empty
    }

    // Capitalize the first letter and concatenate with the rest of the sentence
    return sentence.toLowerCase();
}

function formatDateTime(timestamp) {
    const date = new Date(timestamp); // Convert timestamp to milliseconds

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const formattedDate = `${date.getDate()} ${months[date.getMonth()]
    }, ${date.getFullYear()}`;

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours || 12; // Handle midnight (0 hours)

    const formattedTime = `${hours}:${(minutes < 10 ? "0" : "") + minutes}:${(seconds < 10 ? "0" : "") + seconds
    } ${ampm}`;

    return {
        date: formattedDate,
        time: formattedTime,
    };
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const month = monthNames[date.getMonth()];
    const day = date.getDate();

    return `${month} ${day}`;
}

function getValidToken() {
    const cookies = document.cookie.split(';');
    const tokenPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/; // Basic JWT pattern

    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'uid' && tokenPattern.test(value)) {
            return value;
        }
    }
    return null;
}


function getCurrentUser() {
    const currentUser = localStorage.getItem('rt_user')
    return JSON.parse(currentUser)
}

function getUserInitials(firstName, lastName) {
    const firstInitial = firstName.charAt(0);
    const lastInitial = lastName.charAt(0);
    return `${firstInitial}${lastInitial}`.toUpperCase();
}

function getUserInitialsForName(name) {
    return name.charAt(0).toUpperCase();
}

function getInitialsForWord(...words) {
    const wordParts = words.join(' ').split(/\s|_/);

    if (wordParts.length > 1) {
        return wordParts.map(word => word.charAt(0).toUpperCase()).join('');
    } else {
        return wordParts[0].charAt(0).toUpperCase();
    }
}

function formatCurrency(input) {
    // Convert input to a string if it's a number
    if (typeof input === 'number') {
        input = input.toString();
    }

    // Check if input is a string
    if (typeof input !== 'string') {
        // If it's not a string or a number, return an error message or handle it appropriately
        return 'Invalid input';
    }

    // Remove non-numeric characters
    let numericValue = input.replace(/[^0-9.]/g, "");

    // Split the numeric value into integer and decimal parts
    const parts = numericValue.split('.');
    let integerPart = parts[0];
    let decimalPart = parts[1];

    // Format the integer part with commas
    integerPart = parseFloat(integerPart).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    // If there is a decimal part, include it with the formatted integer part
    if (decimalPart) {
        // Format as currency with commas and decimals
        const formattedValue = `${integerPart}.${decimalPart}`;

        // Add ₦ symbol as a prefix
        return `₦${formattedValue}`;
    } else {
        // If there is no decimal part, return the formatted integer part without adding zeros
        return `₦${integerPart}`;
    }
}

function dd(item) {
    console.log('DEBUG - ', item)
}

function getMonthString(days) {
    if (days <= 0 || days > 31) {
        return "Invalid input";
    }

    if (days === 1) {
        return "1 month";
    }

    // Calculate the month based on the number of days.
    const monthNumber = Math.ceil(days / 30);
    return `${monthNumber} month${monthNumber > 1 ? 's' : ''}`;
}

function calculateWorkingDays(period) {
    const workingDaysPerWeek = 5;

    switch (period) {
        case '1 week':
            return workingDaysPerWeek;
        case '2 weeks':
            return workingDaysPerWeek * 2;
        case '3 weeks':
            return workingDaysPerWeek * 3;
        case '1 month':
            return workingDaysPerWeek * 4;
        case '2 months':
            return workingDaysPerWeek * 8;
        case '3 months':
            return workingDaysPerWeek * 12;
        default:
            return 0; // Invalid input
    }
}

function truncateText(text, maxLength, showEllipsis = true, start = 0) {
    if (text.length <= maxLength) return text;
    return text.slice(start, maxLength) + (showEllipsis ? '...' : '');
}

function getCurrentYear() {
    return new Date().getFullYear();
}

function getCurrentMonthNumber() {
    // Months are zero-indexed, so we add 1 to get the current month number
    return new Date().getMonth() + 1;
}

function getCurrentDateFormatted() {
    const options = {day: '2-digit', month: 'long', year: 'numeric'};
    return new Date().toLocaleDateString('en-US', options);
}

function getCurrentMonth() {
    // Create an array of month names
    const monthNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    // Get the current date
    const currentDate = new Date();

    // Get the month from the current date (0-indexed)
    const currentMonthIndex = currentDate.getMonth();

    // Get the month name using the index
    return monthNames[currentMonthIndex];
}

function convertDateFormat(inputDate) {
    // Create a new Date object from the input date string
    const dateObject = new Date(inputDate);

    // Extract the year, month, and day components
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = dateObject.getDate().toString().padStart(2, '0');

    // Assemble the formatted date string
    return `${year}-${month}-${day}`;
}

function timeAgo(timestamp) {
    const now = new Date(); // Current time
    const pastTime = new Date(timestamp); // Time of the past event

    const secondsAgo = Math.floor((now - pastTime) / 1000); // Difference in seconds

    if (secondsAgo < 60) {
        return `${secondsAgo} second${secondsAgo !== 1 ? 's' : ''} ago`;
    } else if (secondsAgo < 3600) {
        const minutes = Math.floor(secondsAgo / 60);
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (secondsAgo < 86400) {
        const hours = Math.floor(secondsAgo / 3600);
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
        const days = Math.floor(secondsAgo / 86400);
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
}

function formatWords(words) {
    if (words) {
        // Split the words using underscore as the separator
        const wordArray = words.split('_');

        // Capitalize the first letter of the first word
        const firstWord = wordArray[0].charAt(0).toUpperCase() + wordArray[0].slice(1);

        // Join the words back together, starting from the second word
        return [firstWord, ...wordArray.slice(1)].join(' ');
    }
}

async function compressImage(file, targetWidth = 100, targetHeight = 100, quality = 0.8) {
    return new Promise((resolve, reject) => {
        if (!file || !(file instanceof File) || !file.type.startsWith('image/')) {
            reject(new Error('Invalid image file provided.'));
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            const originalImage = new Image();
            originalImage.src = e.target.result;

            originalImage.onload = async () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = targetWidth;
                canvas.height = targetHeight;

                ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

                const compressedSrc = canvas.toDataURL(file.type, quality);

                resolve(compressedSrc);
            };
        };

        reader.readAsDataURL(file);
    });
}

function capitalizeAndJoinWords(wordArray) {
    // Check if the input is an array
    if (!Array.isArray(wordArray)) {
        return "Input is not an array";
    }

    // Capitalize the first letter of each word
    const capitalizedWords = wordArray.map(word => word.charAt(0).toUpperCase() + word.slice(1));

    // Join the words with commas
    return capitalizedWords.join(', ');
}

function convertDateFormatReverse(originalDate) {
    // Split the date and time parts
    const [datePart] = originalDate.split(' ');

    // Split the date into year, month, and day
    const [year, month, day] = datePart.split('-');

    // Format the date as DD/MM/YYYY
    return `${day}/${month}/${year}`;
}


function formatDate(dateString) {
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
}

function formatDateToReadable(dateString) {
    const date = new Date(dateString);

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    // Split the formatted date to reformat it
    const [weekday, monthDay] = formattedDate.split(', ');
    const [month, day] = monthDay.split(' ');

    return `${weekday}, ${month} ${day}`;
}




export {
    formatDateToReadable,
    capitalizeFirstLetter,
    formatDateTime,
    formatDate,
    getValidToken,
    getCurrentUser,
    getUserInitials,
    getUserInitialsForName,
    formatCurrency,
    dd,
    capitalizeFirstLetterInSentence,
    getMonthString,
    calculateWorkingDays,
    truncateText,
    getCurrentYear,
    getCurrentMonthNumber,
    getCurrentDateFormatted,
    getCurrentMonth,
    convertDateFormat,
    setLowerCaseForAllWordsInSentence,
    timeAgo,
    getInitialsForWord,
    formatWords,
    compressImage,
    capitalizeAndJoinWords,
    convertDateFormatReverse,
    formatTimestamp,
}