# Image-Upload-API [*//*]

```markdown 
# 🚀 FastAPI Image Upload Interface

> A sleek, minimal file upload demo built with **FastAPI** and vanilla **HTML/CSS/JS** to learn full-stack file handling, static file serving, and dynamic image previews.

---

## ✨ Features

- 📤 Upload `.jpg/.jpeg` images through a clean HTML interface
- ⚙️ Backend powered by FastAPI with modern async handling
- 🖼️ Real-time image preview after successful upload
- 🌐 CORS-enabled for smooth dev-side requests
- 🗂️ Static file serving via `StaticFiles` mount

---

## 🧠 Learning Objectives

This project was built to explore:

- ✅ FastAPI routing with `UploadFile`
- ✅ Handling and saving files server-side
- ✅ Serving uploaded content dynamically
- ✅ Implementing CORS middleware
- ✅ JavaScript `fetch()` with `FormData`

---

## 🖥️ Tech Stack

| Layer      | Tech        |
|------------|-------------|
| Backend    | FastAPI     |
| Frontend   | HTML5, CSS3, JavaScript |
| Server     | Uvicorn     |

---

## 📂 Project Tree

```
.
├── main.py          # FastAPI app
├── index.html       # Frontend upload form
└── README.md        # This file
```

---
```
## ⚠️ Dev Notes

- `allow_origins=["*"]` is used for **development only** – restrict this in production.
- Image saving path is currently hardcoded – adjust for your OS/environment as needed.

---

## 📸 Preview before implementation of future ideas

Here’s what it looks like in action:

![App Screenshot](screenshots/upload_preview.png)

## Preview after the implementation of future ideas and database integration
![App Screenshot](screenshots/afterupdated.png)



---

## 🧬 Future Ideas
[x] = completed

- 🧾 expand form to include full name, dob, image [x]
- ☁️ Integrate a database to upload the formdata [x]
- Integrate CRUD capabalities [x]

## Bonus Features
Facial Encoding Extraction:
A dynamic face encoding system was integrated into the subject registration workflow. Upon submission of a new subject via a POST request—including an uploaded facial image—the image is processed using the face_recognition library. Facial encodings (128-dimensional face embeddings) are extracted and stored in a separate MongoDB encodings collection. Each encoding is linked to the corresponding subject via the subject's MongoDB _id, enabling efficient face lookup, matching, and identity verification across the system. The process is fully asynchronous and encapsulated in a reusable helper function.
*screenshot:* <br>
Subject Data: <br>
![App Screenshot](screenshots/subjectdata.png)
<br>
Encodings Data:<br>
![App Screenshot](screenshots/encodingdata.png)

---


---

```

