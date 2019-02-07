import {smartDiff} from "../../src/text-utils";

describe('smartDiff', () => {
  it('with equal texts', () => {
    const oldText = 'Hello'
    const newText = 'Hello'
    const {shiftAmount} = smartDiff(oldText, newText)
    expect(shiftAmount).toBe(0)
  })
  it('with one character added at the beginning', () => {
    const oldText = 'Hello'
    const newText = '1Hello'
    const {start, end, shiftAmount} = smartDiff(oldText, newText)
    expect(start).toBe(0)
    expect(end).toBe(1)
    expect(shiftAmount).toBe(1)
  })
  it('with one character added at the end', () => {
    const oldText = 'Hello'
    const newText = 'Hello1'
    const {start, end, shiftAmount} = smartDiff(oldText, newText)
    expect(start).toBe(5)
    expect(end).toBe(6)
    expect(shiftAmount).toBe(1)
  })
  it('with one character added in between', () => {
    const oldText = 'Hello'
    const newText = 'Hel1lo'
    const {start, shiftAmount} = smartDiff(oldText, newText)
    expect(start).toBe(3)
    expect(shiftAmount).toBe(1)
  })
  it('with five characters added in between', () => {
    const oldText = 'Hello'
    const newText = 'Hel12345lo'
    const {start, shiftAmount} = smartDiff(oldText, newText)
    expect(start).toBe(3)
    expect(shiftAmount).toBe(5)
  })
  it('with suppressed content at the beginning', () => {
    const oldText = 'Hello'
    const newText = 'ello'
    const {start, end, shiftAmount} = smartDiff(oldText, newText)
    expect(start).toBe(0)
    expect(end).toBe(0)
    expect(shiftAmount).toBe(-1)
  })
  it('with suppressed content in between', () => {
    const oldText = 'Hello'
    const newText = 'Hllo'
    const {start, shiftAmount} = smartDiff(oldText, newText)
    expect(start).toBe(1)
    expect(shiftAmount).toBe(-1)
  })
  it('with suppressed content at the end', () => {
    const oldText = 'Hello'
    const newText = 'Hell'
    const {start, end, shiftAmount} = smartDiff(oldText, newText)
    expect(start).toBe(4)
    expect(end).toBe(4)
    expect(shiftAmount).toBe(-1)
  })
  it('with text replacement of the same length', () => {
    const oldText = 'Hello'
    const newText = 'He1lo'
    const {start, end, shiftAmount} = smartDiff(oldText, newText)
    expect(start).toBe(2)
    expect(end).toBe(3)
    expect(shiftAmount).toBe(0)
  })
  it('with text replacement of smaller length', () => {
    const oldText = 'Hello'
    const newText = 'H1lo'
    const {start, end, shiftAmount} = smartDiff(oldText, newText)
    expect(start).toBe(1)
    expect(end).toBe(2)
    expect(shiftAmount).toBe(-1)
  })
  it('with text replacement of greater length', () => {
    const oldText = 'Hello'
    const newText = 'H12llo'
    const {start, end, shiftAmount} = smartDiff(oldText, newText)
    expect(start).toBe(1)
    expect(end).toBe(3)
    expect(shiftAmount).toBe(1)
  })
})
