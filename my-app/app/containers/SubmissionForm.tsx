'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface FormInput {
  nickname: string
  email: string
  description: string
  github?: string
  youtube?: string
  submissionNumber?: number
  ipAddress?: string
  userAgent?: string
  timestamp?: string
}

export function SubmissionForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>()
  const [submitted, setSubmitted] = useState(false)

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      // Get submission count from API
      const countResponse = await fetch('/api/submissions/count')
      const { count } = await countResponse.json()
      
      // Get client info
      const ipResponse = await fetch('/api/ip')
      const { ip } = await ipResponse.json()
      
      const submissionData = {
        ...data,
        submissionNumber: count + 1,
        ipAddress: ip,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      }

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }
      setSubmitted(true)
    } catch (error) {
      console.error('Submission failed:', error)
    }
  }

  return (
    <section id="submission" className="py-20 bg-grey">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Submit Your Project</h2>
        {submitted ? (
          <div className="text-center text-green-600">
            <p>Thank you for your submission!</p>
            <p>We'll review your project and get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Nickname</label>
              <input
                {...register('nickname', { required: true })}
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.nickname && <span className="text-red-500">This field is required</span>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.email && <span className="text-red-500">This field is required</span>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Project Description</label>
              <textarea
                {...register('description', { required: true })}
                className="w-full px-4 py-2 border rounded-lg"
                rows={4}
              />
              {errors.description && <span className="text-red-500">This field is required</span>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">GitHub Link (optional)</label>
              <input
                type="url"
                {...register('github')}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">YouTube Link (optional)</label>
              <input
                type="url"
                {...register('youtube')}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Project
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
