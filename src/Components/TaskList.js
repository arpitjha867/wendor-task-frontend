import React from 'react';
import { Text } from '@mantine/core';
import Cards from './Cards'

const TaskList = ({ tasks, onDelete, onModalOpen, onSetUpdateId }) => {
  return (
    <>
      {tasks.length > 0 ? (
        tasks.map((task) => <Cards key={task.id} task={task} onDelete={onDelete} onModalOpen={onModalOpen} onSetUpdateId={onSetUpdateId}/>)
      ) : (
        <Text size={'lg'} mt={'md'} color={'dimmed'}>
          You have no tasks
        </Text>
      )}
    </>
  );
};

export default TaskList;
