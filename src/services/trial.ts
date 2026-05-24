import AsyncStorage from "@react-native-async-storage/async-storage";

const TRIAL_KEY = "@tryonai_trial";

interface TrialData {
  tryOnsUsed: number;
  trialStartDate: string | null;
  maxFreeTryOns: number;
  trialDays: number;
}

const DEFAULT_TRIAL: TrialData = {
  tryOnsUsed: 0,
  trialStartDate: null,
  maxFreeTryOns: 3,
  trialDays: 3,
};

export const trialService = {
  async get(): Promise<TrialData> {
    const raw = await AsyncStorage.getItem(TRIAL_KEY);
    if (!raw) return { ...DEFAULT_TRIAL };
    return { ...DEFAULT_TRIAL, ...JSON.parse(raw) };
  },

  async incrementTryOn(): Promise<void> {
    const data = await this.get();
    if (!data.trialStartDate) {
      data.trialStartDate = new Date().toISOString();
    }
    data.tryOnsUsed += 1;
    await AsyncStorage.setItem(TRIAL_KEY, JSON.stringify(data));
  },

  async isTrialExpired(): Promise<boolean> {
    const data = await this.get();
    if (data.tryOnsUsed >= data.maxFreeTryOns) return true;
    if (data.trialStartDate) {
      const start = new Date(data.trialStartDate);
      const now = new Date();
      const daysSince = (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSince > data.trialDays) return true;
    }
    return false;
  },

  async remainingTryOns(): Promise<number> {
    const data = await this.get();
    return Math.max(0, data.maxFreeTryOns - data.tryOnsUsed);
  },

  async daysRemaining(): Promise<number> {
    const data = await this.get();
    if (!data.trialStartDate) return data.trialDays;
    const start = new Date(data.trialStartDate);
    const now = new Date();
    const daysSince = (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    return Math.max(0, Math.ceil(data.trialDays - daysSince));
  },
};
