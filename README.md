Keylogger Monitoring System

Overview

This project is a Keylogger Monitoring System designed to collect and analyze keystrokes from a monitored device. The system consists of three main components:

KeyLoggerAgent – Captures keystrokes, encrypts them, and sends the data to a remote server.

Backend (Flask Server) – Receives, decrypts, and stores the data. It also serves the collected data to the frontend.

Frontend (Web Interface) – Displays the captured keystroke data in an organized and user-friendly manner.

Features

1. Captures and logs keystrokes in structured JSON format.
2. Stores additional metadata, including active window title, timestamp, and computer name.
3.  Encrypts data before transmission for security.
4.   Sends the data to a Flask server via network communication.
5.    Web interface to view and analyze collected keystroke data

