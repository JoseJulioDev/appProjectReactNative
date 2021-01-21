import React, {useEffect, useState} from 'react';
import { SafeAreaView , FlatList, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';

import api from './services/api';

export default function App(){
    const [projects, setProjects] = useState([]);

    useEffect(() => {
      api.get('projects').then(response => {
        setProjects(response.data);
      });
    }, []);

    async function handleAddProject() {
      const response = await api.post('projects', {
        title: `Novo Projeto ${Date.now()}`,
        owner: 'José Julio'
      });

      const project = response.data;

      setProjects([...projects, project]);
    }

    async function handleUpdateProject(id) {

      const response = await api.put(`projects/${id}`, {
          title: `Projeto alterado ${Data.now()}`,
          owner: 'José Julio'
      });

      const updateProject = response.data;

      const projectsUpdate = projects.map(project => {
        if(project.id === id) {
          return updateProject;
        }else {
          return project;
        }
      });

      setProjects(projectsUpdate);

    }

    async function handleExclusaoProject(id) {
      await api.delete(`projects/${id}`);

      setProjects(projects.filter(
        project => project.id !== id
      ));
    }
    
    return (
        <>
          <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>
          <SafeAreaView style={styles.container}>
             <FlatList 
               data={projects}
               keyExtractor={project => project.id}
               renderItem={({item: project}) => (
                  <>
                    <Text style={styles.project} > {project.title} </Text>
                    <Text style={styles.textButtonUpdateDelte} onPress={() => handleUpdateProject(project.id)}> alterar </Text>
                    <Text style={styles.textButtonUpdateDelte} onPress={() => handleExclusaoProject(project.id)}> excluir </Text>
                  </>
                  
               )}
             />

             <TouchableOpacity style={styles.button} onPress={handleAddProject}>
               <Text style={styles.textButton}>Adicionar Projeto</Text>
             </TouchableOpacity>
          </SafeAreaView>
        </>
    );
}


/*
      <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>
          <View style={styles.container} >
            {projects.map(project => (
                <Text style={styles.project} key={project.id}>{project.title}</Text>
            ))}
          </View> 
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },
    project: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold'
    },
    button: {
      backgroundColor: '#fff',
      margin: 20,
      height: 50,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textButton: {
      fontSize: 16,
      fontWeight: 'bold'
    },
    textButtonUpdateDelte: {
      fontSize: 20,
      fontWeight: 'bold'
    },
});

