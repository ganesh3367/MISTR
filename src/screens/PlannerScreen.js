import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { theme } from '../constants/theme';
import Button from '../components/Button';
import Card from '../components/Card';

export default function PlannerScreen() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const addTask = () => {
        if (!newTask.trim()) return;
        const task = {
            id: Date.now().toString(),
            title: newTask,
            completed: false,
        };
        setTasks([...tasks, task]);
        setNewTask('');
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Planner</Text>
                <Text style={styles.subtitle}>Organize your study goals</Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a new task..."
                    placeholderTextColor={theme.colors.textSecondary}
                    value={newTask}
                    onChangeText={setNewTask}
                />
                <Button title="Add" onPress={addTask} size="small" style={styles.addBtn} />
            </View>

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <Card style={styles.taskCard}>
                        <TouchableOpacity
                            style={styles.taskContent}
                            onPress={() => toggleTask(item.id)}
                        >
                            <View style={[styles.checkbox, item.completed && styles.checkboxChecked]} />
                            <Text style={[styles.taskText, item.completed && styles.taskCompleted]}>
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteTask(item.id)}>
                            <Text style={styles.deleteText}>✕</Text>
                        </TouchableOpacity>
                    </Card>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No tasks yet. Start planning!</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.m,
    },
    header: {
        marginBottom: theme.spacing.l,
    },
    title: {
        ...theme.typography.h1,
        color: theme.colors.text,
    },
    subtitle: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
    },
    inputContainer: {
        flexDirection: 'row',
        gap: theme.spacing.s,
        marginBottom: theme.spacing.l,
    },
    input: {
        flex: 1,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.s,
        paddingHorizontal: theme.spacing.m,
        paddingVertical: theme.spacing.s,
        borderWidth: 1,
        borderColor: theme.colors.border,
        color: theme.colors.text,
    },
    addBtn: {
        justifyContent: 'center',
    },
    list: {
        gap: theme.spacing.s,
    },
    taskCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: theme.spacing.m,
    },
    taskContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: theme.spacing.m,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: theme.colors.primary,
    },
    checkboxChecked: {
        backgroundColor: theme.colors.primary,
    },
    taskText: {
        ...theme.typography.body,
        color: theme.colors.text,
    },
    taskCompleted: {
        textDecorationLine: 'line-through',
        color: theme.colors.textSecondary,
    },
    deleteText: {
        color: theme.colors.textSecondary,
        fontSize: 18,
        padding: theme.spacing.s,
    },
    emptyState: {
        alignItems: 'center',
        marginTop: theme.spacing.xl,
    },
    emptyText: {
        color: theme.colors.textSecondary,
    },
});
