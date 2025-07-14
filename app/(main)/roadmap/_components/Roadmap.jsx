'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SparkleIcon } from 'lucide-react'
import { generateAIRoadmap } from '@/actions/roadmap'
const Roadmap = ({ create, setCreate, setRoadmaps }) => {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);

    try {
      const res = await generateAIRoadmap({ userInput: input });

      if (res.success) {
        setRoadmaps((prev) => [
          ...prev,
          {
            id: res.data.slug,
            name: res.data.title,
          },
        ]);
        setCreate(false);
        setInput('');
      }
    } catch (err) {
      console.error('Failed to generate roadmap:', err);
    } finally {
      setLoading(false);
    }

  };


  return (
    <Dialog open={create} onOpenChange={setCreate}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Position/Skill to Generate Roadmap</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-2">
              <Input
                placeholder="e.g. Full Stack Developer"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setCreate(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleGenerate} disabled={loading}>
            <SparkleIcon className="mr-2 h-4 w-4" />
            {loading ? 'Generating...' : 'Generate'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Roadmap
