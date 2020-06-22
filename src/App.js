import React, {useEffect, useState} from "react";
import api from './services/api'


import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
      api.get('repositories').then(
        res => {setRepositories(res.data)
        }
      )
  }, [])

  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`)

    const findindex = repositories.findIndex( repository => repository.id === id );

    const {likes} = repositories[findindex]; 

    repositories[findindex].likes = likes + 1;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
      <FlatList
      data={repositories}
      keyExtractor={repo => repo.id}
      renderItem={({item: repositories}) => (
        <>
          <Text style={styles.repository}>{repositories.title}</Text>

          <View style={styles.techsContainer}>
            <Text style={styles.tech}>
              {repositories.tech[0]}
            </Text>
          </View>

          <View style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              testID={repo.id}
            >
            {`${repo.likes} curtidas.`}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(repo.id)}
            testID={repo.likes}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
        </>      
      )}
      
      />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
