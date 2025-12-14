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
        console.log(mediaType);

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
          })
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
        style={{ padding: 16, alignItems: "center", justifyContent: "center" }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: colorScheme === "dark" ? "#fff" : "#1f2937",
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
      className={`w-full flex-row items-center mb-6 rounded-xl px-6 py-3 ${
        colorScheme === "dark" ? "bg-black/70" : "bg-white/70"
      } shadow-md`}
      style={{
        gap: 32,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 6,
        backdropFilter: "blur(12px)",
      }}
    >
      <Image
        source={`https://image.tmdb.org/t/p/original${item.logo_path}`}
        contentFit="contain"
        style={{
          width: "100%",
          height: 120,
          borderRadius: 12,
        }}
      />
      <Text
        style={{
          fontSize: 13,
          fontWeight: "600",
          color: colorScheme === "dark" ? "#fff" : "#1f2937",
          textAlign: "center",
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
      <View style={{ marginBottom: 24 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
            color: colorScheme === "dark" ? "#fff" : "#1f2937",
            marginBottom: 12,
            marginLeft: 16,
          }}
        >
          {title}
        </Text>
        <FlatList
          data={providers}
          keyExtractor={(item) => `${item.type}-${item.provider_id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          renderItem={renderProviderItem}
        />
      </View>
    );
  };

  return (
    <View>
      {renderCategory(t("providers.flatrate"), flatrateProviders)}
      {renderCategory(t("providers.rent"), rentProviders)}
      {renderCategory(t("providers.buy"), buyProviders)}
      <View className="px-4 mt-2">
        <Text className="text-xs text-slate-500 dark:text-slate-400 text-center">
          {t("providers.attribution")}
        </Text>
      </View>
    </View>
  );
};

export default ProvidersList;
