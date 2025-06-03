import Image from "next/image";
import SubjectForm from "./components/SubjectForm";
import Grid from "./components/Grid";
import ThemeProvider from "./providers/ThemeProvider";
import Login from "./components/Login";
import Header from "@/app/components/Header"
import FaceCapture from "./components/FaceCapture";


export default function Home() {
  return (
    <div>
      <ThemeProvider>
          <Login />
      </ThemeProvider>
    </div>
  );
}
