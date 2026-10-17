import type { ProjectMediaItem } from '@/config/bijonConfig';

export const isMoving = (item?: ProjectMediaItem) => item?.type === 'video' || item?.type === 'gif';

/** A still image for an item: its poster, or the image itself. */
export const stillOf = (item?: ProjectMediaItem) =>
  item ? item.poster || (item.type === 'image' ? item.src : '') : '';
