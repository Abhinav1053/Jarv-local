const btn = document.querySelector('.talk')
const content = document.querySelector('.content')


function speak(text){
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 3;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe(){
    var day = new Date();
    var hour = day.getHours();

    if(hour>=0 && hour<12){
        speak("Good Morning Boss...")
    }

    else if(hour>12 && hour<17){
        speak("Good Afternoon Master...")
    }

    else{
        speak("Good Evenining Sir...")
    }

}

window.addEventListener('load', ()=>{
    speak("Initializing Jarvis");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition =  new SpeechRecognition();

recognition.onresult = (event)=>{
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());

}

btn.addEventListener('click', ()=>{
    content.textContent = "Listening...."
    recognition.start();
})

function takeCommand(message) {
    message = message.toLowerCase();

    if(message.includes('hey') || message.includes('hello')){
        speak("Hello Sir, How May I Help You?");
    }

    else if(message.includes("open google")){
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    }

    else if(message.includes("open youtube")){
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube...");
    }

    else if(message.includes("open facebook")){
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    }

    else if(message.includes("open twitter")){
        window.open("https://twitter.com", "_blank");
        speak("Opening Twitter...");
    }

    else if(message.includes("open github")){
        window.open("https://github.com", "_blank");
        speak("Opening GitHub...");
    }

    else if(message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    }

    else if(message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    }

    else if(message.includes('time')) {
        const time = new Date().toLocaleTimeString();
        speak("The current time is " + time);
    }

    else if(message.includes('date')) {
        const date = new Date().toLocaleDateString();
        speak("Today's date is " + date);
    }

    else if(message.includes('calculator')) {
        window.open('Calculator:///', "_blank");
        speak("Opening Calculator");
    }

    else if(message.includes('weather')) {
        window.open(`https://www.google.com/search?q=weather+in+your+city`, "_blank");
        speak("Here is the current weather information.");
    }

    else if(message.includes("news")) {
        window.open("https://news.google.com", "_blank");
        speak("Fetching the latest news...");
    }

    else if(message.includes("joke")) {
        const jokes = [
            "Why don't scientists trust atoms? Because they make up everything!",
            "I'm reading a book on anti-gravity. It's impossible to put down.",
            "What do you call fake spaghetti? An impasta!"
        ];
        const joke = jokes[Math.floor(Math.random() * jokes.length)];
        speak(joke);
    }

    else if(message.includes("play music")) {
        window.open("https://open.spotify.com/", "_blank");
        speak("Playing music on Spotify.");
    }

    else if(message.includes("note")) {
        const note = prompt("What would you like to note down?");
        localStorage.setItem("myNote", note);
        speak("I have saved your note.");
    }

    else if(message.includes("show note")) {
        const note = localStorage.getItem("myNote");
        speak("Here's your note: " + (note ? note : "You haven't saved any note yet."));
    }

    // AI Chat Mode - fallback if no command matches
    else {
        const responses = [
            "I'm still learning, but I'll try to help!",
            "Hmm, that's interesting. Tell me more.",
            "I didn't quite get that, but I'm listening.",
            "Let me think... Oh wait, I'm a program 😄",
            "I'm here for you. Say something else!",
            "That sounds cool! What else can I do for you?"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        speak(randomResponse);
    }
}

