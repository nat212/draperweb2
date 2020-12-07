export function preventEventBubble(event: Event) {
  event.cancelBubble = true;
}
