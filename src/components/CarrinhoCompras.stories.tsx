import type { Meta, StoryObj } from '@storybook/react';

import CarrinhoCompras from './CarrinhoCompras';

const meta = {
  component: CarrinhoCompras,
} satisfies Meta<typeof CarrinhoCompras>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};