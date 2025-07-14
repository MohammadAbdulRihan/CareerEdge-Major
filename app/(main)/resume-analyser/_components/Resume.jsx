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
import { File, Sparkles, Upload } from "lucide-react"
import { useState } from "react"
import Analysis from "./Analysis"
const Resume = () => {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null);
    const { data, fn, error, loading } = useFetch(getAnalysis)
    const onFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
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
        try {
            await fn(formData);
            setOpen(false);
            console.log(data);

            setFile(null);
        } catch (e) {
            console.error("Error uploading file:", error);
            setOpen(false);
            return;
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <span className="flex items-center gap-2 text-xl mt-8 cursor-pointer" >
                        <Upload className="h-5 w-5" />
                        <span>Upload Resumer</span>
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
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button disabled={loading || !file} onClick={() => onFileUpload()}>
                            {
                                loading ? "Analyzing..." : <><Sparkles /> Upload and Analyse</>
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {
                data && <Analysis data={data} />
            }
        </>
    )
}

export default Resume