import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";
import ResultsList from "../components/ResultsList";

const SearchScreen = () => {

    const [term, setTerm] = useState('');
    const [searchApi, results, error] = useResults();

    const filterResult = price => {
        return results.filter(result => {
            return result.price === price;
        })
    };

    return (
        <>
            <SearchBar
                term={term}
                onTermChange={setTerm}
                onTermSubmit={() => searchApi(term)}
            />
            <ScrollView>
                <ResultsList
                    title='Cost Effective'
                    results={filterResult('$')}
                />
                <ResultsList
                    title='Bit pricier'
                    results={filterResult('$$')}
                />
                <ResultsList
                    results={filterResult('$$$')}
                    title='Big Spender'
                />
            </ScrollView>
        </>
    )
};

const styles = StyleSheet.create({});

export default SearchScreen;

