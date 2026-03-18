import { Colors } from "@/constants/Colors";
import useWatchProvider from "@/hooks/useWatchProvider";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Text, View, useColorScheme } from "react-native";

interface Provider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
  type: string;
}

interface Props {
  movieId: string;
  selectedCountry: string;
  mediaType: string;
}

const ProvidersList = ({ movieId, selectedCountry, mediaType }: Props) => {
  const [flatrateProviders, setFlatrateProviders] = useState<Provider[]>([]);
  const [rentProviders, setRentProviders] = useState<Provider[]>([]);
  const [buyProviders, setBuyProviders] = useState<Provider[]>([]);
  const [noData, setNoData] = useState(false);
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const data = await useWatchProvider(movieId, mediaType);
        const countryData = data?.results?.[selectedCountry];

        if (!countryData || Object.keys(countryData).length === 0) {
          setNoData(true);
          setFlatrateProviders([]);
          setRentProviders([]);
          setBuyProviders([]);
          return;
        }

        setNoData(false);

        const flatrate: Provider[] = (countryData.flatrate || []).map(
          (p: any) => ({
            ...p,
            type: "flatrate",
          }),
        );
        const rent: Provider[] = (countryData.rent || []).map((p: any) => ({
          ...p,
          type: "rent",
        }));
        const buy: Provider[] = (countryData.buy || []).map((p: any) => ({
          ...p,
          type: "buy",
        }));

        setFlatrateProviders(flatrate);
        setRentProviders(rent);
        setBuyProviders(buy);
      } catch (error) {
        console.error("Providers fetch error:", error);
      }
    };

    fetchProviders();
  }, [selectedCountry]);

  if (noData) {
    return (
      <View
        style={{
          padding: 24,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 24,
          backgroundColor:
            colorScheme === "dark"
              ? "rgba(36,33,60,0.75)"
              : "rgba(255,255,255,0.85)",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: colorScheme === "dark" ? "#fff" : "#1f2937",
            letterSpacing: 0.2,
            textAlign: "center",
          }}
        >
          {t("providers.notfound")}
        </Text>
      </View>
    );
  }

  if (
    !flatrateProviders.length &&
    !rentProviders.length &&
    !buyProviders.length
  )
    return null;

  const renderProviderItem = ({ item }: { item: Provider }) => (
    <View
      style={{
        width: 110,
        alignItems: "center",
        justifyContent: "flex-start",
        marginRight: 12,
        borderRadius: 22,
        backgroundColor:
          colorScheme === "dark"
            ? "rgba(36,33,60,0.75)"
            : "rgba(255,255,255,0.85)",
        paddingVertical: 18,
        paddingHorizontal: 8,
        borderWidth: 1.5,
        borderColor:
          colorScheme === "dark"
            ? "rgba(124,58,237,0.18)"
            : "rgba(124,58,237,0.08)",
        marginBottom: 2,
      }}
    >
      <Image
        source={`https://image.tmdb.org/t/p/original${item.logo_path}`}
        contentFit="contain"
        style={{
          width: 60,
          height: 60,
          borderRadius: 16,
          marginBottom: 10,
          backgroundColor: colorScheme === "dark" ? "#232136" : "#f3f0ff",
        }}
      />
      <Text
        style={{
          fontSize: 13.5,
          fontWeight: "700",
          color: colorScheme === "dark" ? "#fff" : "#1f2937",
          textAlign: "center",
          marginTop: 2,
        }}
        numberOfLines={2}
      >
        {item.provider_name}
      </Text>
    </View>
  );

  const renderCategory = (title: string, providers: Provider[]) => {
    if (providers.length === 0) return null;
    return (
      <View style={{ marginBottom: 28 }}>
        <Text
          style={{
            fontSize: 16.5,
            fontWeight: "800",
            color: Colors.dark.cFuc6,
            marginBottom: 10,
            marginLeft: 18,
            letterSpacing: 0.2,
          }}
        >
          {title}
        </Text>
        <FlatList
          data={providers}
          keyExtractor={(item) => `${item.type}-${item.provider_id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 2 }}
          ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
          renderItem={renderProviderItem}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {renderCategory(t("providers.flatrate"), flatrateProviders)}
      {renderCategory(t("providers.rent"), rentProviders)}
      {renderCategory(t("providers.buy"), buyProviders)}
      <View
        style={{
          paddingHorizontal: 16,
          position: "relative",
          bottom: 4,
        }}
      >
        <Text
          style={{
            fontSize: 11.5,
            color: Colors.dark.cDarkGray,
            textAlign: "center",
            fontWeight: "500",
            letterSpacing: 0.1,
            opacity: 0.7,
          }}
        >
          {t("providers.attribution")}
        </Text>
      </View>
    </View>
  );
};

export default ProvidersList;
