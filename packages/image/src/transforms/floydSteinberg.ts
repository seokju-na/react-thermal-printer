import floyd_steinberg from 'floyd-steinberg';
import type { ImageTransform } from './ImageTransform.js';

export const floydSteinberg: ImageTransform = image => floyd_steinberg(image as any);
