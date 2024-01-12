import { StyleSheet, View, Image, ScrollView } from 'react-native';
import React from 'react';

export default function Favorit() {
  const imageUrls = [
    
    'https://m.media-amazon.com/images/I/81YqH88N8vL._AC_UF1000,1000_QL80_.jpg',
   'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/99d78223-4de0-43c7-9ce1-5d9ab7de6939/de50p4i-08e67358-386b-4416-a4f6-7ac32a998ac4.png/v1/fit/w_828,h_828,q_70,strp/_mikumikudance_mmd__hor_bronya__honkai_impact_3rd__by_angelinaschmidt_de50p4i-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcLzk5ZDc4MjIzLTRkZTAtNDNjNy05Y2UxLTVkOWFiN2RlNjkzOVwvZGU1MHA0aS0wOGU2NzM1OC0zODZiLTQ0MTYtYTRmNi03YWMzMmE5OThhYzQucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.Z33k-h08QZ5K2gVkAfRDHc8X-5o_kz9Tx8hTHMFmPTM',
   'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ae619df9-73af-48ab-a67b-bdb258e047dc/dg5s67a-4d97f69f-3014-4ba4-8fd6-4bc9726c5fcd.png/v1/fill/w_1024,h_683,q_80,strp/nilou___b_by_pekotu_dg5s67a-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjgzIiwicGF0aCI6IlwvZlwvYWU2MTlkZjktNzNhZi00OGFiLWE2N2ItYmRiMjU4ZTA0N2RjXC9kZzVzNjdhLTRkOTdmNjlmLTMwMTQtNGJhNC04ZmQ2LTRiYzk3MjZjNWZjZC5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.JCb0_xRwAR22GNLXZLrbNlwY_DEZXhy9aUm0VddOH-k',

'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ae619df9-73af-48ab-a67b-bdb258e047dc/dg5thvx-e0aae94b-38eb-4367-9ac8-faff76eeac10.png/v1/fill/w_1024,h_683,q_80,strp/faruzan___b_by_pekotu_dg5thvx-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjgzIiwicGF0aCI6IlwvZlwvYWU2MTlkZjktNzNhZi00OGFiLWE2N2ItYmRiMjU4ZTA0N2RjXC9kZzV0aHZ4LWUwYWFlOTRiLTM4ZWItNDM2Ny05YWM4LWZhZmY3NmVlYWMxMC5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.N_JjNNWwZ3Z6D7fw-ntcy7wxqBKqUCJyoa-awL-p4mo',

'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ae619df9-73af-48ab-a67b-bdb258e047dc/dg5pwp6-95bdd8cc-aaf2-4deb-ab40-ff202881febb.png/v1/fill/w_1024,h_683,q_80,strp/xiangling___b_by_pekotu_dg5pwp6-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjgzIiwicGF0aCI6IlwvZlwvYWU2MTlkZjktNzNhZi00OGFiLWE2N2ItYmRiMjU4ZTA0N2RjXC9kZzVwd3A2LTk1YmRkOGNjLWFhZjItNGRlYi1hYjQwLWZmMjAyODgxZmViYi5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.GOd5g_2B5i8kSFqiTQH6r87K5OBia4K3A_XbxKB4EnA',

'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ae619df9-73af-48ab-a67b-bdb258e047dc/dg61nva-2f1c6b3e-84eb-4287-9357-fb915213a6aa.png/v1/fit/w_800,h_1200,q_70,strp/ayaka___c_by_pekotu_dg61nva-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTIwMCIsInBhdGgiOiJcL2ZcL2FlNjE5ZGY5LTczYWYtNDhhYi1hNjdiLWJkYjI1OGUwNDdkY1wvZGc2MW52YS0yZjFjNmIzZS04NGViLTQyODctOTM1Ny1mYjkxNTIxM2E2YWEucG5nIiwid2lkdGgiOiI8PTgwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.gRUSeRxDvgfxsDZm7aCX0EDFnDrZ9Rsc_SBRaJfHgGs',

  ];

  const imagesPerRow = 3;
  const numberOfRows = Math.ceil(imageUrls.length / imagesPerRow);

  return (
    <View style={{ backgroundColor: 'white' }}>
      {Array.from({ length: numberOfRows }).map((_, rowIndex) => (
        <View key={rowIndex} style={styles.rowContainer}>
          {imageUrls
            .slice(rowIndex * imagesPerRow, (rowIndex + 1) * imagesPerRow)
            .map((url, index) => (
              <Image key={index} source={{ uri: url }} style={styles.galeri} />
            ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  galeri: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: '#fff',
    margin: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});