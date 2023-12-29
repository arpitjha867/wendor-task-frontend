import React from 'react';
import { Card, Text, Group, ActionIcon } from '@mantine/core';
import { IconTrash, IconEdit } from '@tabler/icons-react';

const Task = ({ task, onDelete, onModalOpen, onSetUpdateId }) => {
  return (
    <Card withBorder key={task.id} mt={'sm'}>
      <Group position={'apart'}>
        <Text weight={'bold'}>{task.title}</Text>
        <div style={{ display: 'flex', gap: '10px' }}>
          <ActionIcon onClick={() => {
            onModalOpen(true);
            onSetUpdateId({open : true, id : task.id});
          }} color={'yellow'} variant={'transparent'}>
            <IconEdit />
          </ActionIcon>
          <ActionIcon onClick={() => onDelete(task.id)} color={'red'} variant={'transparent'}>
            <IconTrash />
          </ActionIcon>
        </div>
      </Group>

      <Text color={'dimmed'} size={'md'} mt={'sm'}>
        {task.description}
      </Text>
    </Card>
  );
};

export default Task;
