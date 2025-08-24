'use server';

/**
 * @fileOverview An AI-powered password strength analyzer.
 *
 * - analyzePasswordStrength - A function that analyzes the strength of a password.
 * - AnalyzePasswordStrengthInput - The input type for the analyzePasswordStrength function.
 * - AnalyzePasswordStrengthOutput - The return type for the analyzePasswordStrength function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePasswordStrengthInputSchema = z.object({
  password: z.string().describe('The password to analyze.'),
});
export type AnalyzePasswordStrengthInput = z.infer<
  typeof AnalyzePasswordStrengthInputSchema
>;

const AnalyzePasswordStrengthOutputSchema = z.object({
  strength: z
    .string()
    .describe(
      'A description of the password strength (e.g., Weak, Moderate, Strong, Very Strong).'
    ),
  feedback: z
    .string()
    .describe(
      'Suggestions for improving the password strength, if applicable.'
    ),
});
export type AnalyzePasswordStrengthOutput = z.infer<
  typeof AnalyzePasswordStrengthOutputSchema
>;

export async function analyzePasswordStrength(
  input: AnalyzePasswordStrengthInput
): Promise<AnalyzePasswordStrengthOutput> {
  return analyzePasswordStrengthFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzePasswordStrengthPrompt',
  input: {schema: AnalyzePasswordStrengthInputSchema},
  output: {schema: AnalyzePasswordStrengthOutputSchema},
  prompt: `You are an AI-powered password strength analyzer. You will receive a password as input, and you will analyze its strength and give detailed feedback. You will determine how strong the password is, and provide specific and actionable feedback to the user on how they can increase the strength of their password.

Password: {{{password}}}`,
});

const analyzePasswordStrengthFlow = ai.defineFlow(
  {
    name: 'analyzePasswordStrengthFlow',
    inputSchema: AnalyzePasswordStrengthInputSchema,
    outputSchema: AnalyzePasswordStrengthOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
