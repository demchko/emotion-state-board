import { EmotionData, EmotionsData } from "@/types/emotions";

export const emotionsData: EmotionsData = {
    joy: {
        icon: '😊',
        color: 'bg-yellow-700',
        borderColor: 'border-yellow-700',
        activeStyles: 'bg-yellow-200 border-yellow-300',
        name: 'Радість'
    },
    sadness: {
        icon: '😢',
        color: 'bg-blue-700',
        borderColor: 'border-blue-700',
        activeStyles: 'bg-blue-200 border-blue-300',
        name: 'Смуток'
    },
    anger: {
        icon: '😠',
        color: 'bg-red-700',
        borderColor: 'border-red-700',
        activeStyles: 'bg-red-200 border-red-300',
        name: 'Злість'
    },
    surprise: {
        icon: '😲',
        color: 'bg-purple-700',
        borderColor: 'border-purple-700',
        activeStyles: 'bg-purple-200 border-purple-300',
        name: 'Подив'
    },
    fear: {
        icon: '😨',
        color: 'bg-gray-700',
        borderColor: 'border-gray-700',
        activeStyles: 'bg-gray-200 border-gray-300',
        name: 'Страх'
    },
    disgust: {
        icon: '🤮',
        color: 'bg-green-600',
        borderColor: 'border-green-600',
        activeStyles: 'bg-green-200 border-green-300',
        name: 'Огида'
    },
};