export type EmotionType = 'joy' | 'sadness' | 'anger' | 'fear' | 'love' | 'surprise';

export interface Emotion {
    id: string;
    comment: string;
    type: EmotionType;
}

export interface EmotionData {
    icon: string;
    color: string;
    borderColor: string;
    activeStyles: string;
    name: string;
}
export type EmotionsData = Record<EmotionType, EmotionData>;