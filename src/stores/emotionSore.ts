import { Emotion, EmotionType } from '@/types/emotions';
import { makeAutoObservable } from 'mobx';

class EmotionStore {
    emotions: Emotion[] = [];
    isModalOpen: boolean = false;

    constructor() {
        makeAutoObservable(this);
        this.loadFromStorage();
    }

    addEmotion = (type: EmotionType, comment: string) => {
        const newEmotion: Emotion = {
            id: Date.now().toString(),
            type,
            comment,
        };

        this.emotions.push(newEmotion);
        this.saveToStorage();
    };

    removeEmotion = (id: string) => {
        this.emotions = this.emotions.filter(emotion => emotion.id !== id);
        this.saveToStorage();
    };

    // Action: очищення всіх емоцій
    clearAllEmotions = () => {
        this.emotions = [];
        this.saveToStorage();
    };

    // Збереження в localStorage
    private saveToStorage = () => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('emotions', JSON.stringify(this.emotions));
        }
    };

    // Завантаження з localStorage
    private loadFromStorage = () => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('emotions');
            if (stored) {
                try {
                    const parsedEmotions = JSON.parse(stored);
                    // Перетворюємо timestamp з string в Date
                    this.emotions = parsedEmotions.map((emotion: any) => ({
                        ...emotion,
                        timestamp: new Date(emotion.timestamp)
                    }));
                } catch (error) {
                    console.error('Помилка завантаження емоцій:', error);
                    this.emotions = [];
                }
            }
        }
    };
}

// Створюємо единий екземпляр store
export const emotionStore = new EmotionStore();