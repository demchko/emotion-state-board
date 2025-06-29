import { Emotion, EmotionType } from '@/types/emotions';
import { makeAutoObservable } from 'mobx';

class EmotionStore {
    emotions: Emotion[] = [];
    isModalOpen: boolean = false;
    private isHydrated: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    hydrate = () => {
        if (!this.isHydrated && typeof window !== 'undefined') {
            this.loadFromStorage();
            this.isHydrated = true;
        }
    };

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

    get isReady() {
        return this.isHydrated;
    }

    reorderEmotions = (startIndex: number, endIndex: number) => {
        const result = Array.from(this.emotions);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        this.emotions = result;
        this.saveToStorage();
    };

    clearAllEmotions = () => {
        this.emotions = [];
        this.saveToStorage();
    };

    private saveToStorage = () => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('emotions', JSON.stringify(this.emotions));
        }
    };

    private loadFromStorage = () => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('emotions');
            if (stored) {
                try {
                    const parsedEmotions = JSON.parse(stored);
                    this.emotions = parsedEmotions.map((emotion: Emotion) => ({
                        ...emotion,
                        // timestamp: new Date(emotion.timestamp)
                    }));
                } catch (error) {
                    console.error('Помилка завантаження емоцій:', error);
                    this.emotions = [];
                }
            }
        }
    };
}

export const emotionStore = new EmotionStore();