"use client"
import { getAnalysis } from "@/actions/resume-analyser"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import useFetch from "@/hooks/use-fetch"
import { File, FileSearch2Icon, Sparkles } from "lucide-react"
import { useState } from "react"
const ResumeUploadDialog = () => {
    const [file, setFile] = useState(null);
    const onFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("File selected:", file.name);
            setFile(file);
        }
    };

    const onFileUpload = async () => {
        const formData = new FormData();
        if (!file) {
            console.error("No file selected");
            return;
        }
        formData.append("resumeFile", file);
        const { data, fn, error, loading } = useFetch(getAnalysis)
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="flex items-center gap-2 mt-8">
                    <FileSearch2Icon className="h-4 w-4" />
                    <span>Resume Analyser</span>
                </span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">Upload resume pdf file </DialogTitle>
                    <DialogDescription>
                        <div>
                            <label htmlFor="resume-upload" className="flex flex-col items-center justify-center p-7 border-dashed rounded-xl hover:bg-slate-800 cursor-pointer m-2">
                                <File size={50} />
                                {
                                    file ? <span className="mt-3 text-white">{file.name}</span>
                                        : <span className="mt-3">Click here to upload your resume</span>
                                }
                            </label>
                            <input type="file" accept=".pdf" id="resume-upload" className="hidden"
                                onChange={onFileChange}
                            />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" >
                        Cancel
                    </Button>
                    <Button disabled={!file} onClick={() => onFileUpload()}>
                        <Sparkles /> Upload and Analyse
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ResumeUploadDialog