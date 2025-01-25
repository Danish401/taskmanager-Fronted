import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksByUserId, updateTaskDetails } from '../redux/taskSlice';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Paper,
  IconButton,
} from '@mui/material';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { TbDragDrop } from 'react-icons/tb';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDroppable } from '@dnd-kit/core';

// Task Component
function Task({ task }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task._id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  };

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      sx={{
        marginBottom: 2,
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        ...style,
      }}
    >
      <IconButton sx={{ cursor: 'grab', marginLeft: 1 }}>
        <TbDragDrop size={24} />
      </IconButton>
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" fontWeight="bold" color="#004d40">
          {task.name}
        </Typography>
        <Typography variant="body2" color="#00897b">
          {task.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

// Column Component
function Column({ title, status, tasks }) {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <Paper
      ref={setNodeRef}
      sx={{
        backgroundColor: '#F9FAFB',
        borderRadius: '15px',
        padding: 3,
        minHeight: '400px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
          marginBottom: 3,
          fontWeight: 'bold',
          color: '#26a69a',
          borderBottom: '2px solid #004d40',
          paddingBottom: 1,
        }}
      >
        {title}
      </Typography>
      <Box sx={{ flex: 1 }}>
        {tasks.length > 0 ? (
          tasks.map((task) => <Task key={task._id} task={task} />)
        ) : (
          <Typography
            variant="body2"
            color="#004d40"
            sx={{ textAlign: 'center', marginTop: 2 }}
          >
            No tasks
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

// Main DragDrop Component
const DragDrop = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [groupedTasks, setGroupedTasks] = useState({});
    const { user } = useSelector((state) => state.auth); // Get user from auth slice
    const userId = user?._id;
useEffect(() => {
    if (userId) {
      dispatch(fetchTasksByUserId(userId)); // Fetch tasks by user ID if logged in
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (tasks.length) {
      const statuses = ['Pending', 'Completed', 'Done'];
      const grouped = statuses.reduce((acc, status) => {
        acc[status] = tasks.filter((task) => task.status === status);
        return acc;
      }, {});
      setGroupedTasks(grouped);
    }
  }, [tasks]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const sourceStatus = Object.keys(groupedTasks).find((key) =>
      groupedTasks[key]?.some((task) => task._id === activeId)
    );

    if (!sourceStatus || !overId || sourceStatus === overId) return;

    const taskToMove = {
      ...groupedTasks[sourceStatus].find((task) => task._id === activeId),
    };

    if (!taskToMove) return;

    taskToMove.status = overId;

    setGroupedTasks((prevGroupedTasks) => {
      const updatedSourceTasks = prevGroupedTasks[sourceStatus].filter(
        (task) => task._id !== activeId
      );
      const updatedTargetTasks = [...(prevGroupedTasks[overId] || []), taskToMove];

      return {
        ...prevGroupedTasks,
        [sourceStatus]: updatedSourceTasks,
        [overId]: updatedTargetTasks,
      };
    });

    try {
      await dispatch(
        updateTaskDetails({
          id: taskToMove._id,
          taskData: { status: taskToMove.status },
        })
      ).unwrap();
    } catch (error) {
      console.error('Failed to update task:', error);

      setGroupedTasks((prevGroupedTasks) => {
        return {
          ...prevGroupedTasks,
          [sourceStatus]: [...prevGroupedTasks[sourceStatus], taskToMove],
          [overId]: prevGroupedTasks[overId].filter(
            (task) => task._id !== activeId
          ),
        };
      });
    }
  };

  if (loading) return <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />;
  if (error) return <Typography color="error">Error: {error.message || 'An error occurred.'}</Typography>;

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: '#fffff',
          minHeight: '100vh',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            marginBottom: 4,
            fontWeight: 'bold',
            color: '#7F57F1',
          }}
        >
          
        </Typography>
        <Grid container spacing={3}>
          {['Pending', 'Completed', 'Done'].map((status) => (
            <Grid item xs={12} sm={6} md={4} key={status}>
              <SortableContext
                items={groupedTasks[status]?.map((task) => task._id) || []}
                strategy={verticalListSortingStrategy}
              >
                <Column title={status} status={status} tasks={groupedTasks[status] || []} />
              </SortableContext>
            </Grid>
          ))}
        </Grid>
      </Box>
    </DndContext>
  );
};

export default DragDrop;
