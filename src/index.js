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

    async function handleAddProject(){
      const response = await api.post('projects', {
        title: `Novo Projeto ${Date.now()}`,
        owner: 'Jose Julio'
      });

      const project = response.data;

      setProjects([...projects, project]);
    }
    
    return (
        <>
          <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>
          <SafeAreaView style={styles.container}>
             <FlatList 
               data={projects}
               keyExtractor={project => project.id}
               renderItem={({item: project}) => (
                  <Text style={styles.project} >{project.title}</Text>
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
});

