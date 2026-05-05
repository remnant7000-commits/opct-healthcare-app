/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Mission {
  id: string;
  title: string;
  subtitle: string;
  current: number;
  goal: number;
  reward: number;
  icon: string;
  active: boolean;
}

export interface MarketItem {
  id: string;
  name: string;
  price: number;
  category: 'headwear' | 'footwear' | 'boosts';
  image: string;
  owned: boolean;
  rare?: boolean;
}

export type Screen = 'dashboard' | 'train' | 'market' | 'ranks';
