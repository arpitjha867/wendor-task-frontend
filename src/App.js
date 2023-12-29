import { ToastContainer, toast } from 'react-toastify';
import TaskList from './Components/TaskList.js';
import { createTaskApi, deleteTaskApi, updateTaskApi, loadTasksApi } from './Functions/api.js';
import 'react-toastify/dist/ReactToastify.css';
import {
	Button,
	Container,
	Title,
	Modal,
	TextInput,
	Group,
} from '@mantine/core';
import { useState, useRef, useEffect } from 'react';
import {
	MantineProvider
} from '@mantine/core';

export default function App() {
	const [tasks, setTasks] = useState([]);
	const [opened, setOpened] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [openedUpdate, setOpenedUpdate] = useState({open : false, id : null});
	const taskTitle = useRef('');
	const taskDescription = useRef('');

	const filteredTasks = tasks.filter((task) =>
    	task.title.toLowerCase().includes(searchQuery.toLowerCase())
  	);

	  const createTask = async () => {
		const title = taskTitle.current.value;
		const description = taskDescription.current.value;
		if (title === '' && description === '') {
		  toast.info('Please enter the required info');
		  return;
		}
		try {
		  const data = await createTaskApi(title, description);
		  if (data.success) {
			setTasks((prevData) => [...prevData, { id: data.id, title, description }]);
			toast.success('Note added successfully');
		  } else {
			toast.error('Failed to add toast');
		  }
		} catch (error) {
		  toast.error('Something went wrong!');
		}
	  };
	
	  const deleteTask = async (id) => {
		try {
		  const data = await deleteTaskApi(id);
		  if (data.success) {
			setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
			toast.success(data.message);
		  } else {
			toast.error(data.error);
		  }
		} catch (error) {
		  toast.error('Something went wrong!');
		}
	  };
	
	  const updateTask = async (id) => {
		const title = taskTitle.current.value;
		const description = taskDescription.current.value;
		if (title === '' && description === '') {
		  toast.info('Please enter the required info');
		  return;
		}
		try {
		  const data = await updateTaskApi(id, title, description);
		  if (data.success) {
			setTasks((prevData) =>
			  prevData.map((task) =>
				task.id === id ? { ...task, title: title, description: description } : task
			  )
			);
			toast.success(data.message);
		  } else {
			toast.error(data.error);
		  }
		} catch (error) {
		  toast.error('Something went wrong!');
		}
		setOpenedUpdate(null);
	  };
	
	  const loadTasks = async () => {
		try {
		  const data = await loadTasksApi();
		  if (data.success) {
			setTasks(data.data);
			toast.success('Notes fetched successfully');
		  } else {
			toast.error(data.error);
		  }
		} catch (error) {
		  toast.error('Failed to fetch notes');
		}
	  };

	useEffect(() => {
		loadTasks();
	}, []);

	return (

			<MantineProvider
				theme={{ defaultRadius: 'md' }}
				withGlobalStyles
				withNormalizeCSS>
				<div className='App'>
					<Modal
						opened={opened}
						size={'md'}
						title={openedUpdate?.open ? 'Update Todo' : 'New Todo'}
						withCloseButton={false}
						onClose={() => {
							setOpened(false);
							setOpenedUpdate(null);
						}}
						centered>
						<TextInput
							mt={'md'}
							ref={taskTitle}
							placeholder={'Todo Title'}
							required
							label={'Title'}
						/>
						<TextInput
							ref={taskDescription}
							mt={'md'}
							placeholder={'Todo Description'}
							label={'Summary'}
						/>
						<Group mt={'md'} position={'apart'}>
							<Button
								onClick={() => {
									setOpened(false);
									setOpenedUpdate(null);
								}}
								variant={'subtle'}>
								Cancel
							</Button>
							<Button
								onClick={() => {
									if(openedUpdate?.open){
										updateTask(openedUpdate.id);
									}else{
										createTask();
									}
									setOpened(false);
								}}>
								{openedUpdate?.open ? 'Update Todo' : 'Create Todo'}
							</Button>
						</Group>
					</Modal>
					<Container size={550} my={40}>
						<Group position={'apart'}>
							<Title
								sx={theme => ({
									fontFamily: `Greycliff CF, ${theme.fontFamily}`,
									fontWeight: 900,
								})}>
								All Todos
							</Title>
						</Group>
						<TextInput
					value={searchQuery}
					onChange={(event) => setSearchQuery(event.target.value)}
					placeholder='Search Todo'
					mt={20}
				/>
					<TaskList tasks={filteredTasks} onDelete={deleteTask} onModalOpen={setOpened} onSetUpdateId={setOpenedUpdate} />
						<Button
							onClick={() => {
								setOpened(true);
							}}
							fullWidth
							mt={'md'}>
							New Todo
						</Button>
					</Container>
				</div>
				<ToastContainer />
			</MantineProvider>
	);
}

