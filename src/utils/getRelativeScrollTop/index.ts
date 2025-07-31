export const getRelativeScrollTop = (
  container: HTMLElement | null | undefined,
  item: HTMLElement | null | undefined
) => {
  if (container && item) {
    return item.offsetTop - container.offsetTop;
  }
};
