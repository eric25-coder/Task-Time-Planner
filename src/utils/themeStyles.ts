import { ThemeType } from '../types';

export interface ThemeConfig {
  name: string;
  bg: string;
  cards: string;
  innerCards: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  border: string;
  gradient: string;
}

export const THEMES: Record<ThemeType, ThemeConfig> = {
  blossom: {
    name: 'Blossom',
    bg: '#FFF0F5',
    cards: '#F8DCE9',
    innerCards: '#FFF6FA',
    primary: '#E88BB5',
    secondary: '#C8B5E8',
    accent: '#D85F96',
    text: '#29232B',
    border: '#EFBBD1',
    gradient: 'linear-gradient(135deg, #FFF0F5 0%, #F8DCE9 50%, #FFF6FA 100%)'
  },
  sky: {
    name: 'Sky',
    bg: '#F1F7FF',
    cards: '#DCEBFA',
    innerCards: '#F5F9FF',
    primary: '#79AFE0',
    secondary: '#B9B0E8',
    accent: '#477DB8',
    text: '#24344A',
    border: '#BBD5F0',
    gradient: 'linear-gradient(135deg, #F1F7FF 0%, #DCEBFA 50%, #F5F9FF 100%)'
  },
  nature: {
    name: 'Nature',
    bg: '#FFF8ED',
    cards: '#F0E5D5',
    innerCards: '#FAF3E9',
    primary: '#91B7A0',
    secondary: '#D99576',
    accent: '#47765B',
    text: '#39332F',
    border: '#D8C9B5',
    gradient: 'linear-gradient(135deg, #FFF8ED 0%, #F0E5D5 50%, #FAF3E9 100%)'
  }
};
