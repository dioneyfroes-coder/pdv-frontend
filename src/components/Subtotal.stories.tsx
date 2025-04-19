import type { Meta, StoryObj } from '@storybook/react';

import Subtotal from './Subtotal';

const meta = {
  component: Subtotal,
} satisfies Meta<typeof Subtotal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    subtotal: 0
  }
};