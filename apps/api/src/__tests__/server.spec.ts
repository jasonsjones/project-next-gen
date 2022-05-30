import { describe, it, expect } from 'vitest';
import { createServer } from '../server';

describe('createServer()', () => {
    it('returns an express app', () => {
        expect(createServer()).toBeTruthy();
    });
});
